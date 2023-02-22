import type { NextPage } from "next";
import Nav from "./ui/components/HomePage/Nav";
import Footer from "./ui/components/HomePage/Footer";
import HeroSection from "./ui/components/HomePage/HeroSection";
import Features from "./ui/components/HomePage/Features";
import HowItWorks from "./ui/components/HomePage/HowItWorks";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Loader from "./ui/shared/Loader";

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  });
  if (loading) {
    return <Loader />;
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
