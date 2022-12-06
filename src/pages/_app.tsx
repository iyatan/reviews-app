import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, UserContext } from "../../context";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Loader from "./ui/components/Loader";
import Sidebar from "./ui/components/Sidebar";
import Dashboard from "./dashboard";

export const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: any) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 5000);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return loading && <Loader />;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <Sidebar>
          <Dashboard />
        </Sidebar>
      </AuthProvider>
    </>
  );
}

export default MyApp;
