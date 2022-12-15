import type { NextPage } from "next";
import Nav from "../pages/ui/components/Nav";
import Footer from "../pages/ui/components/Footer";
import HomepageMain from "./ui/components/HomepageMain";
import MidSection from "./ui/components/MidSection";
import Benefits from "./ui/components/Benefits";
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
      <HomepageMain />
      <Benefits />
      <MidSection />
      <Footer />
    </div>
  );
};
export default Home;
