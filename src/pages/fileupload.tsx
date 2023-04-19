import { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { realTimeDb, storage } from "../../firebase/clientApp";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../context";
import HiCheck from "./ui/shared/HiCheck";
import { occupation } from "./api/occupations";
import { useRouter } from "next/router";
import StatusMessage from "./ui/shared/StatusMessage";
import Loader from "./ui/shared/Loader";

import { convertToHtml } from "mammoth";

import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import domtoimage from "dom-to-image";

const FileUpload: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, posts, setPosts } = useContext(UserContext);

  const [fileUpload, setFileUpload] = useState<string | ArrayBuffer | null>("");
  const occupations = occupation;
  const typeOfDocumentRef = useRef(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const filepickerRef = useRef<HTMLInputElement>(null);
  const professionRef = useRef<HTMLSelectElement>(null);
  const [approval, setApproval] = useState(false);
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const [points, setPoints] = useState(0);
  const usersRef = realTimeDb.ref("users/" + currentUser?.uid + "/points");
  usersRef.once("value", (snapshot) => {
    setPoints(snapshot.val());
  });

  const pdfToImage = async (file: File): Promise<string | null> => {
    try {
      GlobalWorkerOptions.workerSrc = new URL(
        "/pdf.worker.min.js",
        window.location.origin
      ).href;

      const pdfBytes = await file.arrayBuffer();
      const loadingTask = getDocument({ data: pdfBytes });
      const pdfDoc = await loadingTask.promise;
      const page = await pdfDoc.getPage(1);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Failed to get canvas context");
      }
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      return canvas.toDataURL();
    } catch (error) {
      console.error("Error converting PDF to image:", error);
      return null;
    }
  };

  const wordToImage = async (file: File): Promise<string | null> => {
    try {
      const result = await convertToHtml({
        arrayBuffer: await file.arrayBuffer(),
      });
      const html = result.value;

      const container = document.createElement("div");
      container.innerHTML = html;
      container.style.width = "800px";
      container.style.overflow = "hidden";
      document.body.appendChild(container);

      const imageDataUrl = await domtoimage.toPng(container);
      document.body.removeChild(container);

      return imageDataUrl;
    } catch (error) {
      console.error("Error converting Word document to image:", error);
      return null;
    }
  };

  const addDocument = async (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const fileType = file.type;

    if (fileType.startsWith("application/pdf")) {
      const imageDataUrl = await pdfToImage(file);
      setFileUpload(imageDataUrl);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const imageDataUrl = await wordToImage(file);
      setFileUpload(imageDataUrl);
    } else {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }
      reader.onload = (readerEvent) => {
        setFileUpload(readerEvent.target?.result ?? "");
      };
    }
  };

  const updatePosts = (post: any) => {
    if (post) {
      const updatedPosts = [...posts, post];
      setPosts(updatedPosts as any);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!currentUser) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }, 500);
  }, [router, currentUser]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmitInfo = (e: any) => {
    e.preventDefault();
    if (!inputRef?.current?.value) return;

    const file = (filepickerRef.current as HTMLInputElement)?.files?.[0];

    const fileSize = file ? file.size / 1024 / 1024 : 0;
    if (fileSize > 5) {
      alert("File size must be less than 5 MB.");
      return;
    }
    const fileType = file ? file.type : "";
    if (
      !fileType.startsWith("image/svg") &&
      !fileType.startsWith("image/png") &&
      !fileType.startsWith("image/jpeg") &&
      !fileType.startsWith("image/gif") &&
      !fileType.startsWith("application/pdf") &&
      fileType !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      alert("File type must be SVG, PNG, JPG, GIF, PDF, or Word document.");
      return;
    }

    const postId = uuidv4();
    const postPayload = {
      id: postId,
      message: inputRef?.current?.value,
      profession: professionRef?.current?.value,
      author: currentUser?.uid,
      fileUrl: "",
    };
    realTimeDb
      .ref(`posts/${postId}`)
      .set(JSON.parse(JSON.stringify(postPayload)))
      .then(() => {
        if (fileUpload) {
          const uploadTask = storage
            .ref(`posts/${postId}`)
            .putString(fileUpload.toString(), "data_url");
          setFileUpload("");
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              alert(error);
            },
            async () => {
              const emailSubject =
                "Your document has been submitted for review";
              const emailContent = `<p>Your document ${fileName} has been submitted for review. You will be notified when it is ready.</p>`;

              try {
                console.log(currentUser?.email);
                await fetch("/api/send-email", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: currentUser?.email,
                    subject: emailSubject,
                    html: emailContent,
                  }),
                });
              } catch (error) {
                console.error("Error sending email:", error);
              }

              storage
                .ref("posts")
                .child(postId)
                .getDownloadURL()
                .then((url) => {
                  postPayload.fileUrl = url;
                  updatePosts(postPayload);
                  realTimeDb.ref(`posts/${postId}`).set(postPayload);
                });
            }
          );
        }
      });
    inputRef.current.value = "";
    if (professionRef.current) professionRef.current.value = "";
    setApproval(true);
  };

  if (points < 1) {
    return (
      <div>
        <StatusMessage message=" You do not have enought points to get feedback at this moment. Please click  to the  dashboard give a few feedback " />
      </div>
    );
  }
  return (
    <div className="md:ml-[20%] mt-10 w-9/12 flex flex-col ">
      <div className="flex justify-between ">
        <div className="flex flex-col md:w-[90%] ">
          <div className="md:p-6 mt-6 md:mr-20 w-full bg-white rounded-lg border border-gray-200 shadow-md   ">
            {approval ? (
              <div className=" flex-col  w-full h-full flex justify-center items-center">
                <HiCheck></HiCheck>
                <div className="text-center">
                  Thank you for submitting your document. Your document will be
                  reviewed and you will be notified when it is ready.
                </div>
              </div>
            ) : (
              <div className="w-full ">
                <div>
                  <h1 className="border-b-2 px-10 py-5 text-xl  ">
                    <b>Add Documents</b>
                  </h1>
                </div>
                <div className="md:flex p-6  self-center">
                  <div className="w-full px-4 py-6 ">
                    <div className="flex justify-between my-2">
                      <div className="mb-1 mr-1 w-3/6  ">
                        <span className="text-sm  text-gray-500">
                          Profession
                        </span>
                        <select
                          ref={professionRef}
                          className="h-12  px-3 w-full border-2 rounded focus:outline-none"
                        >
                          {occupations.map((occupation, index) => {
                            return <option key={index}>{occupation}</option>;
                          })}
                          {"}"}
                        </select>
                      </div>
                      <div className="mb-1 w-6/12">
                        <span className="text-sm text-gray-500">Type</span>
                        <select
                          ref={typeOfDocumentRef}
                          className="h-12  px-3 w-full border-2 rounded focus:outline-none"
                        >
                          <option value="resume">Resume</option>
                          <option value="research-paper">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="my-2">
                      <span className="text-sm text-gray-500">
                        Describe What You need Help With
                      </span>
                      <textarea
                        ref={inputRef}
                        className=" h-24 py-1 px-3 w-full border-2 rounded focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="my-2"></div>

                    <div className="flex my-2 items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-1/6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 0 dark:hover:border-gray-500 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              {fileUpload
                                ? `${fileName} Attached`
                                : "Click to upload"}
                            </span>{" "}
                            {fileUpload ? "" : "or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG, GIF, PDF, or Word document up to 5MB
                          </p>
                        </div>
                        <input
                          // onClick={() => filepickerRef.current.click()}
                          onChange={addDocument}
                          ref={filepickerRef}
                          type="file"
                          name=""
                          id="dropzone-file"
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="my-3 text-right">
                      <button
                        onClick={handleSubmitInfo}
                        className="h-10 w-full bg-blue-600 rounded text-white hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
