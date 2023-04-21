import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, UserContext } from "../../context";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useEffect, useState } from "react";
import Loader from "./ui/shared/Loader";
import Sidebar from "./ui/components/DashBoard/Sidebar";
import Dashboard from "./dashboard";
import React from "react";
import WebViewMessage from "./ui/shared/WebViewMessage";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSideBar = router.pathname === "/" ? false : true;

  const [showWebViewModal, setShowWebViewModal] = useState<boolean>(false);

  useEffect(() => {
    const isWebView = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return (
        (userAgent.indexOf("FBAN") > -1 && userAgent.indexOf("FBAV") > -1) ||
        userAgent.indexOf("LINE") > -1 ||
        userAgent.indexOf("Twitter") > -1 ||
        userAgent.indexOf("Instagram") > -1 ||
        userAgent.indexOf("Snapchat") > -1 ||
        userAgent.indexOf("Reddit") > -1 ||
        userAgent.indexOf("Discord") > -1
      );
    };

    if (isWebView()) {
      setShowWebViewModal(true);
    }
  }, [router]);

  return (
    <>
      <AuthProvider>
        <Suspense>
          {showWebViewModal ? (
            <WebViewMessage />
          ) : (
            <div className="flex flex-row">
              {showSideBar && <Sidebar />}
              <Component {...pageProps} />
            </div>
          )}
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default MyApp;
