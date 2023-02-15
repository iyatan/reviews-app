import type { NextPage } from "next";
import Nav from "./ui/components/HomePage/Nav";
import Footer from "./ui/components/HomePage/Footer";
import HeroSection from "./ui/components/HomePage/HeroSection";
import Features from "./ui/components/HomePage/Features";
import HowItWorks from "./ui/components/HomePage/HowItWorks";
import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div className="flex flex-col">
      <Nav />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};
export default Home;
