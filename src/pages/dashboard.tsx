import { NextPage } from "next";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useUserData } from "../../hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "./ui/components/Nav";

import router from "next/router";
import Sidebar from "./ui/components/Sidebar";
import React from "react";
import DashboardCard from "./ui/components/DashBoardCard";
import { realTimeDb } from "../../firebase/clientApp";
import { UserContext } from "../../context";

const Dashboard: NextPage = ({ posts }) => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [currentUser]);
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex justify-between">
        <div>
          <Sidebar children={undefined} />
        </div>
        <div className="flex flex-col min-w-[78%]">
          {posts.map((post) => (
            <DashboardCard post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

export async function getServerSideProps() {
  const docs = [];

  // get list of wall posts from Firebase.

  const postRef = await realTimeDb.ref("posts");
  const snapshot = await postRef.once("value");

  const posts = snapshot.val();

  if (posts && posts.length !== 0) {
    const keys = Object.keys(posts);
    keys.forEach((key) => {
      docs.push(posts[key]);
    });
  }
  // pass posts to Home component as props.
  return {
    props: {
      posts: docs.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      }),
    },
  };
}

// export async function getStaticProps() {
//   const docs = [];

//   // get list of wall posts from Firebase.
//   const postRef = await realTimeDb.ref("posts");
//   const snapshot = await postRef.once("value");

//   const posts = snapshot.val();

//   if (posts && posts.length !== 0) {
//     const keys = Object.keys(posts);
//     keys.forEach((key) => {
//       docs.push(posts[key]);
//     });
//   }
//   const notFound = posts[0] ? false : true;
//   // pass posts to Home component as props.
//   return {
//     props: {
//       posts: docs.sort((a, b) => {
//         return new Date(b.timestamp) - new Date(a.timestamp);
//       }),
//     },
//     revalidate: 10, // In seconds
//     notFound,
//   };
// }
