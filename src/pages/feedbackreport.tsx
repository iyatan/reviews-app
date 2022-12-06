import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { UserContext } from "../../context";
import { realTimeDb, storage } from "../../firebase/clientApp";

const FeedbackReport: NextPage = () => {
  const [userComments, setUserComments] = useState<{ [key: string]: string[] }>(
    {}
  );
  console.log({ userComments });
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Please log in to view your feedback report.
          </h5>
        </div>
      </div>
    );
  }

  const userData = realTimeDb
    .ref("posts")
    .orderByChild("author")
    .equalTo(currentUser.uid);

  useEffect(() => {
    userData.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();

        if (post && post.fileUrl && post.comments) {
          setUserComments({
            ...userComments,
            [post.fileUrl]: Object.values(post.comments),
          });
        }
      });
    });
  }, []);

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest Feedback
          </h5>
        </div>
        <div className="flow-root">
          {Object.entries(userComments).map(([fileUrl, authorComments]) => (
            <div>
              <h6 className="text-lg font-bold leading-none text-gray-900 dark:text-white">
                <img src={fileUrl} />
              </h6>
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {authorComments.map((comment) => (
                  <div className="flex rounded-xl bg-white p-4 col-span-12 mt-1">
                    <div className="ml-4 w-full">
                      <div className="mt-4">
                        <p>{comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackReport;
