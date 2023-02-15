import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, UserContext } from "../../context";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Loader from "./ui/shared/Loader";
import Sidebar from "./ui/components/DashBoard/Sidebar";
import Dashboard from "./dashboard";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSideBar = router.pathname === "/" ? false : true;
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };

    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <AuthProvider>
        {pageLoading ? <Loader /> : <Component {...pageProps} />}
        {showSideBar && (
          <Sidebar>
            <Dashboard posts={[]} />
          </Sidebar>
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;
