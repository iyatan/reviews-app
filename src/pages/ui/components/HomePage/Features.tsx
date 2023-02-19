const Features = () => (
  <section id="facts">
    <div className="block rounded-lg shadow-lg bg-white">
      <div className="flex flex-wrap items-center">
        <div className="block w-full lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
          <img
            src="imgs/correctdoc.svg"
            alt="Trendy Pants and Shoes"
            className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
          />
        </div>
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
          <div className="px-6 py-12 md:px-12">
            <h2 className="text-3xl font-bold mb-4 display-5">Main Features</h2>
            <div className="text-gray-500 mb-12">
              Our platform offers the following key features to streamline your
              document review process:
            </div>

            <div className="grid lg:gap-x-12 md:grid-cols-3">
              <div className="mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">
                  Collaborative Review
                </h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Receive feedback from multiple reviewers to gain a robust
                  perspective on your resume.
                </h5>
              </div>

              <div className="mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">
                  Customizable Review Criteria
                </h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Define your own review criteria thar aligns with your goals
                  and objectives.
                </h5>
              </div>

              <div className="">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">
                  Document Security
                </h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Rest assured that your personal information is secure with us.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Features;
