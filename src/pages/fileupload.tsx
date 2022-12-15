import { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { realTimeDb, storage } from "../../firebase/clientApp";
import { v4 } from "uuid";
import { UserContext } from "../../context";
import HiCheck from "./ui/components/HiCheck";
import { occupation } from "./api/occupations";
import { useRouter } from "next/router";

const FileUpload: NextPage = () => {
  const { currentUser, posts, setPosts } = useContext(UserContext);

  const [fileUpload, setFileUpload] = useState(null);
  const occupations = occupation;

  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const professionRef = useRef(null);
  const [approval, setApproval] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [router]);

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
  return (
    <div className="py-20 h-screen bg-gray-300 px-2">
      {approval ? (
        <HiCheck />
      ) : (
        <div className="mx-auto bg-white rounded-lg overflow-hidden max-w-2xl">
          <div className="md:flex">
            <div className="w-full px-4 py-6 ">
              <div className="mb-1">
                <span className="text-sm">Profession</span>
                <select
                  ref={professionRef}
                  className="h-12 px-3 w-full border-blue-400 border-2 rounded focus:outline-none focus:border-blue-600"
                >
                  {occupations.map((occupation) => {
                    return <option>{occupation}</option>;
                  })}
                  {"}"}
                </select>
              </div>

              <div className="mb-1">
                <span className="text-sm">
                  Describe What You need Help With
                </span>
                <textarea
                  ref={inputRef}
                  className="h-24 py-1 px-3 w-full border-2 border-blue-400 rounded focus:outline-none focus:border-blue-600 resize-none"
                ></textarea>
              </div>

              <div className="mb-1"></div>

              <div className="mb-1">
                <span>
                  Attachments (We only support images at this moment )
                </span>

                <div className="relative border-dotted h-32 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                  <div className="absolute">
                    <div className="flex flex-col items-center">
                      {" "}
                      <i className="fa fa-folder-open fa-3x text-blue-700"></i>{" "}
                      <span className="block text-gray-400 font-normal">
                        {fileUpload ? "Attached" : "  Attach you files here"}
                      </span>{" "}
                    </div>
                  </div>{" "}
                  <input
                    // onClick={() => filepickerRef.current.click()}
                    onChange={addDocument}
                    ref={filepickerRef}
                    type="file"
                    className="h-full w-full opacity-0"
                    name=""
                  />
                </div>
              </div>

              <div className="mt-3 text-right">
                <button
                  onClick={handleSubmitInfo}
                  className="ml-2 h-10 w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
