import { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { realTimeDb } from "../../firebase/clientApp";
import HiCheck from "./ui/components/HiCheck";
import Sidebar from "./ui/components/Sidebar";
import { UserContext } from "../../context";

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
    return <HiCheck></HiCheck>;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between">
        <div>
          <Sidebar children={undefined} />
        </div>

        <div className="flex flex-col w-9/12">
          <figure className="p-6 mt-6 mr-20 bg-white rounded-lg border border-gray-200 shadow-md">
            <img
              className="flex items-center justify-between mb-4"
              src={post.fileUrl as string}
              alt="image description"
            />
            <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400">
              Request: <b>{post.message}</b>
            </figcaption>
          </figure>

          <form className="mb-6 mr-20  my-2">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={commentInputRef as any}
                id="comment"
                rows={6}
                className=" p6 w-9/12  mr-20 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              className="ml-2 h-10 w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
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
