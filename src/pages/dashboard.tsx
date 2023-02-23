import { NextPage } from "next";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useUserData } from "../../hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "./ui/components/HomePage/Nav";
import Sidebar from "./ui/components/DashBoard/Sidebar";
import React from "react";
import DashboardCard from "./ui/components/DashBoard/DashBoardCard";
import { realTimeDb } from "../../firebase/clientApp";
import { UserContext } from "../../context";
import Loader from "./ui/shared/Loader";
import ExplanationModal from "./ui/components/DashBoard/ExplanationModal";

interface Post {
  author: any;
  points: number;
  id: string;
  message: string;
  timestamp: number;
  profession: string;
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!currentUser) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }, 500);
  }, [router, currentUser]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isModalOpen && <ExplanationModal onClose={handleModalClose} />}

      <div className="md:ml-[20%] md:w-9/12 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            {posts.map((post) => (
              <DashboardCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
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

  // Sort the posts based on the timestamp
  docs.sort(
    (a, b) => (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any)
  );

  // Get the points of each author
  const authorPoints: { [authorId: string]: number } = {};
  docs.forEach((post) => {
    const authorId = post.author;

    if (!authorPoints[authorId]) {
      authorPoints[authorId] = 0;
    }
    authorPoints[authorId] += post.points;
  });

  // Sort the posts based on the number of points the author has
  docs.sort((a, b) => {
    const pointsA = authorPoints[a.author];
    const pointsB = authorPoints[b.author];
    if (pointsA === pointsB) {
      return (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any);
    }
    return pointsB - pointsA;
  });

  return {
    props: {
      posts: docs,
    },
  };
}
