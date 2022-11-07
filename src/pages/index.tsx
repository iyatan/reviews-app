import type { NextPage } from "next";
import Nav from "../pages/ui/components/Nav";
import Footer from "../pages/ui/components/Footer";
import HomepageMain from "./ui/components/HomepageMain";
import MidSection from "./ui/components/MidSection";
import Benefits from "./ui/components/Benefits";
import SignIn from "./ui/components/SignIn";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Nav />
      <HomepageMain />
      <Benefits />
      <MidSection />
      <Footer />
    </div>
  );
};
export default Home;
