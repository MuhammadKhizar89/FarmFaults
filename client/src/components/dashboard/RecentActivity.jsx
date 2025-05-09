import React from "react";
import Coin from "../../svgs/dashboardSvgs/Coin.svg";
import getRandomDarkColor from "../../utils/randomColor";

const RecentActivity = ({ imageSrc, username, errorType, points }) => {
  return (
    <div className="flex justify-between items-center bg-[#E7DBCA] rounded-3xl w-full lg:w-11/12 my-2 text-[10px] sm:text-[10px] xl:text-sm py-1 sm:py-0">
      <div className="flex items-center gap-3">
        {imageSrc === "N/A" ? (
          <span
            className="min-w-6 aspect-square md:w-7 lg:w-9 xl:w-10 rounded-full text-white text-sm md:text-base text-center flex items-center justify-center"
            style={{ backgroundColor: getRandomDarkColor() }}
          >
            {username[0].toUpperCase()}
          </span>
        ) : (
          <img
            className="w-6 aspect-square object-cover md:w-7 lg:w-9 xl:w-10 rounded-full"
            src={imageSrc}
            alt="User"
          />
        )}
        <p className="max-w-[85%]">{`${username} reported ${errorType}`}</p>
      </div>
      <div className="flex justify-center items-center px-3">
        <p className="mx-2">{points}</p>
        <Coin />
      </div>
    </div>
  );
};

export default RecentActivity;
