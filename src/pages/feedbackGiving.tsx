import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { realTimeDb } from "../../firebase/clientApp";
import HiCheck from "./ui/components/HiCheck";

const FeedbackGiving: NextPage = () => {
  const commentInputRef = useRef<HTMLInputElement>();

  const router = useRouter();
  const post = router.query;

  const [approval, setApproval] = useState(false);
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentInputRef?.current?.value) {
      return;
    }

    realTimeDb
      .ref(`posts/${post.id}/comments`)
      .push(commentInputRef.current.value);
    setApproval(true);
  };

  return (
    <div className="py-20 h-screen bg-gray-300 px-2">
      {approval ? (
        <HiCheck></HiCheck>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <figure className="max-w-lg">
            <img
              className="max-w-full h-auto rounded-lg"
              src={post.fileUrl as string}
              alt="image description"
            />
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Request: <b>{post.message}</b>
            </figcaption>
          </figure>

          <form className="mb-6 text-right m-2">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={commentInputRef as any}
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              className="ml-2 h-10 w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
              onClick={() => handleCommentSubmit}
              type="submit"
            >
              Post comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackGiving;
