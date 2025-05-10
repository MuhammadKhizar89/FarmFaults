import React from "react";
import getRandomDarkColor from "../../utils/randomColor";

export default function LeaderBoard({ position, userImage, userName, totalPoints, rankIcon }) {
  return (
    <div className="flex items-center justify-between bg-[#E7DBCA] rounded-xl my-3 p-3 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 min-w-[80px]">
          <span className="font-medium text-sm">{position}</span>
          <div className="text-[#181C1E] w-5 h-5">{rankIcon}</div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-[#181C1E]/10 flex items-center justify-center">
            {userImage === "N/A" ? (
              <div
                style={{ backgroundColor: getRandomDarkColor(userName[0]) }}
                className="w-full h-full flex items-center justify-center text-white font-medium"
              >
                {userName[0].toUpperCase()}
              </div>
            ) : (
              <img src={userImage || "/placeholder.svg"} alt={userName} className="w-full h-full object-cover" />
            )}
          </div>
          <span className="font-medium">{userName}</span>
        </div>
      </div>

      <div className="font-bold">{totalPoints}</div>
    </div>
  )
}