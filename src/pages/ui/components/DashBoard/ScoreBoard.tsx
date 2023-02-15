import { useContext, useState } from "react";
import { UserContext } from "../../../../../context";
import { realTimeDb } from "../../../../../firebase/clientApp";

const ScoreBoard = () => {
  const { currentUser } = useContext(UserContext);
  const [points, setPoints] = useState(0);
  const usersRef = realTimeDb.ref("users/" + currentUser?.uid + "/points");
  usersRef.once("value", (snapshot) => {
    setPoints(snapshot.val());
  });

  return (
    <div className=" min-h-[20%] w-full max-w-sm bg-[#3372EE] text-white border border-gray-200 rounded-xl shadow p-7 ">
      <div className="flex justify-between ">
        <h5 className="mb-1 text-xl font-medium  ">Points</h5>
        <h1 className=" text-lg "> {points}</h1>
      </div>
      <div className="mt-5">
        This is the number of reviews you can receive. Review more to earn more
        points
      </div>
      <button
        type="button"
        className="py-2.5 px-5 mt-5  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200  hover:text-blue-700 focus:z-10 focus:ring-4  "
      >
        Learn more
      </button>
    </div>
  );
};
export default ScoreBoard;
