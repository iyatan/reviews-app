import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { UserContext } from "../../context";
import { realTimeDb, storage } from "../../firebase/clientApp";
import Sidebar from "./ui/components/DashBoard/Sidebar";

const FeedbackReport: NextPage = () => {
  const { currentUser } = useContext(UserContext);
  const [userComments, setUserComments] = useState<{ [key: string]: string[] }>(
    {}
  );

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const userData = realTimeDb
      .ref("posts")
      .orderByChild("author")
      .equalTo(currentUser.uid);

    const handleData = (snapshot: any) => {
      const newUserComments: any = {};
      snapshot.forEach((childSnapshot: any) => {
        const post = childSnapshot.val();
        if (post && post.fileUrl && post.comments) {
          newUserComments[post.fileUrl] = Object.values(post.comments);
        }
      });
      setUserComments(newUserComments);
    };
    userData.on("value", handleData);
    return () => {
      userData.off("value", handleData);
    };
  }, [currentUser]);

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

  return (
    <div className="md:ml-[20%] md:w-9/12 flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="md:p-6 mt-6 mr-2 md:mr-20 bg-white rounded-lg border border-gray-200 shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Feedback
              </h5>
            </div>
            <div className="flow-root">
              {Object.entries(userComments).map(
                ([fileUrl, authorComments], index) => (
                  <div className="mb-5 border" key={index}>
                    <h6 className="text-lg font-bold leading-none text-gray-900 dark:text-white">
                      <img src={fileUrl} />
                    </h6>
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      {authorComments.map((comment, i) => (
                        <div
                          key={i}
                          className="flex  bg-white p-4 col-span-12 mt-1"
                        >
                          <div className="ml-4 w-full">
                            <div className="mt-4">
                              <p>{comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReport;
