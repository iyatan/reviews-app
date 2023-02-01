import { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { realTimeDb, storage } from "../../firebase/clientApp";
import { v4 } from "uuid";
import { UserContext } from "../../context";
import HiCheck from "./ui/components/HiCheck";
import { occupation } from "./api/occupations";
import { useRouter } from "next/router";
import Sidebar from "./ui/components/Sidebar";
import StatusMessage from "./ui/components/StatusMessage";

const FileUpload: NextPage = () => {
  const { currentUser, posts, setPosts } = useContext(UserContext);

  const [fileUpload, setFileUpload] = useState(null);
  const occupations = occupation;
  const typeOfDocumentRef = useRef(null);

  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const professionRef = useRef(null);
  const [approval, setApproval] = useState(false);
  const router = useRouter();

  const [points, setPoints] = useState(0);
  const usersRef = realTimeDb.ref("users/" + currentUser?.uid + "/points");
  usersRef.once("value", (snapshot) => {
    setPoints(snapshot.val());
  });

  const addDocument = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setFileUpload(readerEvent.target?.result);
    };
  };

  const updatePosts = (post) => {
    if (post) {
      const updatedPosts = [...posts, post];
      setPosts(updatedPosts as any);
    }
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    const postId = v4();
    const postPayload = {
      id: postId,
      message: inputRef.current.value,
      profession: professionRef.current.value,
      author: currentUser.uid,
    };
    realTimeDb
      .ref(`posts/${postId}`)
      .set(JSON.parse(JSON.stringify(postPayload)))
      .then(() => {
        if (fileUpload) {
          const uploadTask = storage
            .ref(`posts/${postId}`)
            .putString(fileUpload, "data_url");
          // filepickerRef.current.value = null;
          setFileUpload(null);
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              alert(error);
            },
            () => {
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
    professionRef.current.value = "";
    setApproval(true);
  };
  if (points < 10) {
    return (
      <div>
        <StatusMessage message=" You do not have enought points to get feedback at this moment. Please click  to the  dashboard give a few feedback " />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-around h-screen ">
        <div className="flex flex-col w-9/12 ">
          <div className="flex self-center justify-center h-5/6  pt-0 m-20 w-5/6 ml-96 bg-white rounded-2xl border border-gray-200 shadow-md  ">
            {approval ? (
              <HiCheck />
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
                          {occupations.map((occupation) => {
                            return <option>{occupation}</option>;
                          })}
                          {"}"}
                        </select>
                      </div>
                      <div className="mb-1 w-6/12">
                        <span className="text-sm text-gray-500">
                          Type of document
                        </span>
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
                              {fileUpload ? "Attached" : "Click to upload"}
                            </span>{" "}
                            {fileUpload ? "" : "or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG, GIF up to 10MB
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
