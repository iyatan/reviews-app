import { useContext, useState } from "react";
import { UserContext } from "../../../../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../../../../firebase/clientApp";
import ScoreBoard from "./ScoreBoard";
import ClosedButton from "../../shared/ClosedButton";

const Sidebar = () => {
  const [showOnMobile, setShowOnMobile] = useState(false);

  const user = useContext(UserContext);
  const router = useRouter();
  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };

  const menuItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/fileupload",
      title: "Upload File",
    },
    {
      href: "/feedbackreport",
      title: "Feedback Report",
    },
  ];
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => setShowOnMobile(!showOnMobile)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        className={`${
          !showOnMobile ? "hidden  " : "w-[100%] md:w-[100%]  flex ml-0"
        }  bg-opacity-100  fixed z-10 top-0 pb-3 px-6  lg:flex flex-col justify-between h-screen border-r bg-white transition duration-300  lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}
      >
        <div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowOnMobile(false)}
              className="absolute  lg:hidden top-0 right-0 m-4"
            >
              <ClosedButton />
            </button>
            <img
              src="https://lh3.googleusercontent.com/a/ALm5wu3zdz2mV_hHWArWJ0rjQUG2tkOZ4MikVaDle-Cl9A=s96-c"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="block mt-4 text-xl font-semibold text-gray-600 lg:block">
              {user?.currentUser?.displayName}
            </h5>
            <span className="block text-gray-400 lg:block">
              {" "}
              {user?.currentUser?.email}
            </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <Link href={menuItems[0].href}>
                <a
                  aria-label="dashboard"
                  className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    (router.asPath.includes("dashboard") ||
                      router.asPath.includes("feedbackGiving")) &&
                    "text-white bg-gradient-to-r from-blue-600 to-blue-400 "
                  }`}
                >
                  <svg
                    className="-ml-1 h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                      className="fill-current text-blue-400 dark:fill-slate-600"
                    ></path>
                    <path
                      d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                      className="fill-current text-blue-200 group-hover:text-blue-300"
                    ></path>
                    <path
                      d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                      className="fill-current group-hover:text-blue-300"
                    ></path>
                  </svg>
                  <span className="-mr-1 font-medium">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href={menuItems[1].href}>
                <a
                  className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    router.asPath === "/fileupload" &&
                    "text-white bg-gradient-to-r from-blue-600 to-blue-400 "
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-300 group-hover:text-blue-300"
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current text-gray-600 group-hover:text-blue-600"
                      d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">
                    Upload Yours
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href={menuItems[2].href}>
                <a
                  className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    router.asPath === "/feedbackreport" &&
                    "text-white bg-gradient-to-r from-blue-600 to-blue-400 "
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className="fill-current text-gray-600 group-hover:text-blue-600"
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    />
                    <path
                      className="fill-current text-gray-300 group-hover:text-blue-300"
                      d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">
                    Your FeedBack
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="m-5">
          <ScoreBoard />
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700" onClick={handleSignOut}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
