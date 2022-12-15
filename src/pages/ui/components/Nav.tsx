import router from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context";
import { auth } from "../../../../firebase/clientApp";

import SignIn from "./SignIn";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="" className="flex items-center">
            <img
              src="imgs/logo.png"
              className="h-20 sm:h-30"
              alt="Feedback Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FeedBack
            </span>
          </a>
          <div className="flex md:order-2">
            {user.currentUser ? (
              <button
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                data-modal-toggle="authentication-modal"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            )}
          </div>

          <div
            className="justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {!user.currentUser && (
              <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#why"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Why Use This
                  </a>
                </li>
                <li>
                  <a
                    href="#facts"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Fun Facts
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <SignIn
        isVisible={showModal}
        loginIn={false}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Nav;
