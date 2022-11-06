const MidSection = () => (
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
            <h2 className="text-3xl font-bold mb-4 text-blue-600 display-5">
              Did you know?
            </h2>
            <div className="text-gray-500 mb-12">
              An eye tracking study showed that recruiters spent only seven
              seconds on each resume on average.For that reason, capturing the
              eyes of the recruiteres or hiring managersis crutial
            </div>

            <div className="grid lg:gap-x-12 md:grid-cols-3">
              <div className="mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">45%</h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Of job postings are looking for creativity
                </h5>
              </div>

              <div className="mb-12 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">77%</h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Of resume deal breakers are related to typos
                </h5>
              </div>

              <div className="">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">54%</h2>
                <h5 className="text-lg font-medium text-gray-500 mb-0">
                  Of the resumes get rejected because of lack of customization
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default MidSection;
