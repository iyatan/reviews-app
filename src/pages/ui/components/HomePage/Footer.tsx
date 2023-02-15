import { useState } from "react";
import SignIn from "./SignIn";
const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">How can you get started</h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-400">
            Sign up today and start getting authentic feedbacks
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between">
            <div className=""></div>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase"></a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase"></a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase"></a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase"></a>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center my-12 text-gray-600">
            Copyright © Feedback
          </p>
        </div>
      </div>

      <SignIn
        isVisible={showModal}
        loginIn={false}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Footer;
