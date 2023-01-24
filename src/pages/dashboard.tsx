import { NextPage } from "next";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useUserData } from "../../hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "./ui/components/Nav";
import Sidebar from "./ui/components/Sidebar";
import React from "react";
import DashboardCard from "./ui/components/DashBoardCard";
import { realTimeDb } from "../../firebase/clientApp";
import { UserContext } from "../../context";

interface Post {
  id: string;
  message: string;
  timestamp: number;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
}

interface Props {
  posts: Post[];
}

const Dashboard: NextPage<Props> = ({ posts }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex justify-between">
        <div>
          <Sidebar children={undefined} />
        </div>
        <div className="flex flex-col w-9/12">
          {posts.map((post) => (
            <DashboardCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const docs: Post[] = [];

  const postRef = await realTimeDb.ref("posts");
  const snapshot = await postRef.once("value");

  const posts = snapshot.val();

  if (posts && posts.length !== 0) {
    const keys = Object.keys(posts);
    keys.forEach((key) => {
      docs.push(posts[key]);
    });
  }

  return {
    props: {
      posts: docs.sort((a, b) => {
        return (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any);
      }),
    },
  };
}
