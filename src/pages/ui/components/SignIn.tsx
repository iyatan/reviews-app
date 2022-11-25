import React, { useContext, useEffect } from "react";
import { auth, googleAuthProvider } from "../../../../firebase/clientApp";

import { UserContext } from "../../../../context";
import router from "next/router";
import { useUserData } from "../../../../hooks/useUserData";

type AuthProps = {
  isVisible: boolean;
  loginIn: boolean;
  onClose: () => void;
};

const SignIn = (props: AuthProps) => {
  if (!props.isVisible) return null;
  const handleClose = (e: any) => {
    if (e.target.id === "authentication-modal") {
      props.onClose();
    }
  };
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.currentUser) {
      router.push("/dashboard");
    }
  });

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider).then(() => {
      //   router.push("/dashboard");
    });
  };

  return (
    <div
      onClick={handleClose}
      id="authentication-modal"
      tabIndex={-1}
      className="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-opacity-25 flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => props.onClose()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <button onClick={signInWithGoogle}>sign in with google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
