import { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { realTimeDb } from "../../firebase/clientApp";
import HiCheck from "./ui/shared/HiCheck";
import Sidebar from "./ui/components/DashBoard/Sidebar";
import { UserContext } from "../../context";
import StatusMessage from "./ui/shared/StatusMessage";

const FeedbackGiving: NextPage = () => {
  const commentInputRef = useRef<HTMLInputElement>();
  const { currentUser } = useContext(UserContext);

  const router = useRouter();
  const post = router.query;

  const [approval, setApproval] = useState(false);
  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (!commentInputRef?.current?.value) {
      return;
    }

    realTimeDb
      .ref(`posts/${post.id}/comments`)
      .push(commentInputRef.current.value);

    const usersRef = realTimeDb.ref("users/" + currentUser?.uid + "/points");
    usersRef.transaction(function (currentPoints) {
      return (currentPoints || 0) + 1;
    });
    setApproval(true);
  };

  if (approval) {
    return (
      <div className=" flex-col mt-[20%] w-full h-full flex justify-center items-center">
        <HiCheck></HiCheck>
        <div className="text-center">
          Thank you for your feedback. You're welcome to submit another or
          upload a document to receive feedback in return{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-[20%] mt-10 w-9/12 flex flex-col ">
      <div className="flex justify-between">
        <div className="flex flex-col  md:w-[90%]">
          <figure className="p-6 mt-6 md:mr-20 bg-white rounded-lg border border-gray-200 shadow-md">
            <img
              className="flex items-center justify-between mb-4"
              src={post.fileUrl as string}
              alt="image description"
            />
            <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400">
              Request: <b>{post.message}</b>
            </figcaption>
          </figure>

          <form className="mb-6 md:mr-20  my-2">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={commentInputRef as any}
                id="comment"
                rows={6}
                className=" p6 md:w-9/12  md:mr-20 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              className="ml-2 h-10 w-full bg-blue-600 rounded text-white hover:bg-blue-700"
              onClick={handleCommentSubmit}
              type="submit"
            >
              Post comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackGiving;
