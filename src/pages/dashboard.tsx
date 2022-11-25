import { NextPage } from "next";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useUserData } from "../../hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "./ui/components/Nav";
import { UserContext } from "../../context";
import router from "next/router";
import Sidebar from "./ui/components/Sidebar";
import React from "react";
import DashboardCard from "./ui/components/DashBoardCard";

const Dashboard: NextPage = () => {
  const user = useContext(UserContext);
  const posts = useContext(UserContext);

  useEffect(() => {
    if (!user.currentUser) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex justify-between">
        <div>
          <Sidebar children={undefined} />
        </div>
        <div className="flex flex-col min-w-[78%]">
          <DashboardCard
            profession="Software Engineer"
            requestMessage="Whats Up"
            id={undefined}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
