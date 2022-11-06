const HomepageMain = () => (
  <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
    <div className="container mx-auto xl:px-32">
      <div className="grid lg:grid-cols-2 gap-12 flex items-center">
        <div className="mt-12 lg:mt-0">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
            Get Your Stuff Reviewed <br />
            <span className="text-blue-600"> Improve Docs</span>
          </h1>
        </div>
        <div className="mb-12 lg:mb-0">
          <img
            src="imgs/hero.svg"
            className="w-full rounded-lg shadow-lg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
);

export default HomepageMain;
