const ScoreBoard = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Score
        </h5>
        <h1 className=" text-lg text-gray-500 dark:text-gray-400">0</h1>
      </div>
    </div>
  );
};
export default ScoreBoard;
