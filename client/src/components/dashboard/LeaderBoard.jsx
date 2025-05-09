import React from "react";
import getRandomDarkColor from "../../utils/randomColor";

const LeaderBoard = ({
  userImage,
  userName,
  totalPoints,
  rankIcon,
  positions,
}) => {
  return (
    <div className="flex justify-between items-center bg-[#E7DBCA] px-5 p-[2px] sm:py-2 rounded-3xl sm:w-[75%] lg:w-[90%] xl:w-[70%] my-2 text-[10px] sm:text-[9px] md:text-xs xl:text-sm h-fit">
      <div className="flex items-center w-full gap-2">
        <p className="min-w-[20px]">{positions}</p>
        {rankIcon}
        <div className="flex items-center w-full">
          {userImage === "N/A" ? (
            <span
              className="min-w-6 aspect-square md:min-w-6 lg:min-w-9 xl:min-w-10 rounded-full text-white text-sm  md:text-base text-center flex items-center justify-center"
              style={{ backgroundColor: getRandomDarkColor() }}
            >
              {userName[0].toUpperCase()}
            </span>
          ) : (
            <img
              src={userImage}
              alt={userName}
              className="w-6 aspect-square md:w-7 lg:w-9 xl:w-10 object-cover rounded-full"
            />
          )}
          <p className="ml-2">{userName}</p>
        </div>
      </div>

      <p>{totalPoints}</p>
    </div>
  );
};

export default LeaderBoard;
