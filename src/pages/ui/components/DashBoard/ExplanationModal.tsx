import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

const ExplanationModal = ({ onClose }: Props) => {
  useEffect(() => {
    const handleEscape = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  return (
    <div className="fixed m-auto z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal md:h-full flex justify-center items-center bg-opacity-100  backdrop-blur-md">
      <div tabIndex={-1} aria-hidden="true" className="fixed  ">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
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

            <div className="px-6 py-4 border-b rounded-t ">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                Welcome to Docs Feed
              </h3>
            </div>

            <div>
              <h2 className=" font-bold text-xl p-4">
                To receive feedback on their own resume, users must first review
                other resumes to earn points; each review completed earns one
                point, and one point is required to upload a resume for review,
                with more points resulting in more reviews of their own
                document. This system incentivizes community engagement and
                encourages users to help each other improve their resumes.
              </h2>
            </div>
            <div className=" flex justify-center">
              <img
                src="imgs/colab-1.svg"
                className="w-fullshadow-lg rounded-full w-80 h-80 border p-4 m-4"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExplanationModal;
