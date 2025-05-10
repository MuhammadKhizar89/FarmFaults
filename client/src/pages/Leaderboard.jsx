import React, { useEffect } from "react";
import { useState } from "react";
import Filter from "../svgs/leaderBoardSvgs/Filter.svg";
import img from "../../public/images/leaderboard/image.png";
import RankCard from "../components/leaderboard/RankCard";
import { getleaderBoardRankedUsers } from "../apis/leaderboard.api";
import Loader from "../svgs/Loader";
export default function Leaderboard() {

  const [selectedOption, setSelectedOption] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [leaderBoardUsers,setLeaderBoardUsers]=useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown after selecting
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getleaderBoardRankedUsers(selectedOption);
        console.log("response ---> on frontend ",response);
        setLeaderBoardUsers(response.data);
        console.log("leaderBoardData ---> on frontend ",leaderBoardUsers);
        // Assuming data.user and data.stats structure matches your example
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedOption]);

  return loading?(
    <div className="flex flex-col w-full h-screen justify-center items-center">
    <Loader color="#181C1E" className="w-10 h-10  animate-spin" /> {/* Loader Component */}
    <h1 className="heading txt py-3">Loading...</h1>
  </div>
  ): (
    <main className=" px-4 sm:px-0 sm:pl-5 lg:pl-16 xl:pl-20 bg-primary w-full pt-6 lg:pt-0 ">
      <div className=" sm:w-[73%] md:w-[75%] lg:w-[80%] xl:w-[58%] flex items-center justify-between mt-10  sm:ml-[5%] lg:ml-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Leader Board</h1>
        <div className="flex justify-between gap-4 items-center">
          <p className=" text-sm lg:text-base">Filter by time </p>
          <button
          onClick={handleToggleDropdown}
        >
          <Filter className=" w-3 lg:w-4 xl:w-5"/>
        </button>
        </div>
        {showDropdown && (
          <div className="absolute right-4 sm:right-14 md:right-[9%] lg:right-[5%] xl:right-[25%] top-20   w-fit px-4 lg:px-7 bg-[#e7dbca]  rounded-md shadow-lg z-10">
            <ul className="flex flex-col justify-center items-center text-xs">
              <li
                onClick={() => handleSelectOption('weekly')}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Weekly
              </li>
              <li
                onClick={() => handleSelectOption('monthly')}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Monthly
              </li>
              <li
                onClick={() => handleSelectOption('all time')}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                All Time
              </li>
            </ul>
          </div>
        )}
      </div>

      <section className=" my-8 px-3 h-[420px] sm:ml-[7%] sm:w-[70%] xl:w-[50%]">
        <div className="flex justify-between items-center text-sm sm:text-lg xl:text-xl py-2 px-3 sm:px-7">
          <p>Rank</p>
          <p>Points</p>
        </div>

        <section className="custom-scrollbar overflow-y-auto px-1 sm:px-4">
          {leaderBoardUsers.map((card, index) => (
            <RankCard
              key={index}
              className="" // Add any className if needed
              rank={card.rank}
              userImage={card.avatar}
              userName={card.name}
              score={card.totalPoints}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
