import { useContext } from "react";
import { UserContext } from "../../../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../../../firebase/clientApp";
import ScoreBoard from "./ScoreBoard";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
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
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="mt-8 text-center">
            <img
              src="https://lh3.googleusercontent.com/a/ALm5wu3zdz2mV_hHWArWJ0rjQUG2tkOZ4MikVaDle-Cl9A=s96-c"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {user?.currentUser?.displayName}
            </h5>
            <span className="hidden text-gray-400 lg:block">
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
                      fill-rule="evenodd"
                      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
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
        <div>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
