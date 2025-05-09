import React, { useEffect, useState } from "react";
import RankIcon from "../svgs/dashboardSvgs/Rank.svg";
import LeaderBoard from "../components/dashboard/LeaderBoard";
import RecentActivity from "../components/dashboard/RecentActivity";
import { getUserStats, recentErrors } from "../apis/dashboard.api";
import { Link } from "react-router-dom";
import { dashboard_leaderboardTopUsers } from "../apis/dashboard.api";
import toast from "react-hot-toast";
import Loader from "../svgs/Loader";
export default function Dashboard() {
  const [user, setUser] = useState({ name: "User" });
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [leaderBoardData, setleaderBoardData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalErrors: 0,
    rank: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const positions = ["1st", "2nd", "3rd", "4th", "5th"];

  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1); // increment the page number correctly
  };

  const handlePreviousPage = () => {
    setbuttonDisable(false);
    if (pageNumber > 0) {
      setPageNumber((prevPage) => prevPage - 1); // decrement the page number correctly
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true); // Start loading

      const userStats = await getUserStats();
      console.log(userStats);
      if (userStats.success) {
        setUser(userStats.user);
        setStats(userStats.stats);
        const leaderboardResponse = await dashboard_leaderboardTopUsers();
        setleaderBoardData(leaderboardResponse.data);
      } else {
        toast.error(userStats.message);
      }
      setLoading(false); // End loading after data is fetched
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recentErrors(pageNumber);

        setRecentActivity(response.data.formattedErrors);
        setbuttonDisable(response.data.disableNextButton);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  const { totalPoints, totalErrors, rank } = stats;
  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <Loader color="#181C1E" className="w-10 h-10  animate-spin" />{" "}
        {/* Loader Component */}
        <h1 className="heading txt py-3">Loading...</h1>
      </div>
    );
  }
  return (
    <section className="pt-10 bg-primary w-full pb-16 ">
      <div className="visible lg:hidden text-white poppins fixed border-primary left-[50%] bottom-[3%] translate-x-[-50%] border bg-[#181C1E] py-1 px-3 rounded-xl">
        <Link to="/report-error">Report an error</Link>
      </div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-[#181C1E] ml-6 lg:ml-10 mt-5">
        Welcome Back,{" "}
        {`${user.firstName || ""} ${user.lastName || ""}`.trim() || user.name}!
      </h1>
      {totalPoints || totalErrors || rank ? ( // Check if any stats are available
        <section className="bg-[#E7DBCA] text-[#181c1e] flex justify-around text-xs md:text-sm lg:text-lg xl:text-xl items-center w-[70%] sm:w-[45%] md:w-[50%] xl:w-[40%] sm:px-3 py-3 xl:py-4 rounded-lg sm:rounded-2xl lg:rounded-3xl  mt-6 lg:mt-10 mx-auto mb-5">
          <div className="flex flex-col justify-center items-center">
            <p className="mb-1">{rank}</p>
            <p className="px-3 md:px-5 lg:px-6 rounded-3xl border-2 border-[#181c1e]">
              Rank
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="mb-1">{totalPoints}</p>
            <p className="px-3 md:px-5 lg:px-6 rounded-3xl border-2 border-[#181c1e]">
              Points
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="mb-1">{totalErrors}</p>
            <p className="px-3 md:px-5 lg:px-6 rounded-3xl border-2 border-[#181c1e]">
              Errors
            </p>
          </div>
        </section>
      ) : (
        <p className="mt-5 text-center">Loading stats...</p> // Optional loading state
      )}

      <section className="sm:flex sm:ml-5 lg:ml-10">
        <section className=" px-2 sm:w-3/6">
          <h1 className="text-[#181C1E] text-lg lg:text-3xl xl:text-4xl my-2 sm:my-5 pl-5 sm:pl-0">
            Recent Activity
          </h1>

          <section
            className={`custom-scrollbar${
              recentActivity.length <= 8 ? "h-fits" : ""
            } sm:max-h-[300px] lg:max-h-[410px] px-3 mx-2 sm:mx-0 lg:px-0 `}
          >
            {recentActivity?.map((activity, index) => (
              <RecentActivity
                key={index}
                imageSrc={activity.user.avatar} // User's avatar
                username={`${activity.user.firstName} ${activity.user.lastName}`} // Full username
                errorType={activity.errorType} // Error type
                points={activity.points} // Points
              />
            ))}
          </section>
          <div className=" flex justify-evenly items-center  my-5 lg:my-7 text-xs sm:text-sm lg:text-base">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber == 0}
              className="px-3 py-1 cursor-pointer  border-2 border-[#181c1e]  bg-[#E7DBCA] rounded-md"
            >
              Previous
            </button>
            <p>Page No: {pageNumber + 1}</p>
            <button
              onClick={handleNextPage}
              disabled={buttonDisable}
              className="px-3 py-1 cursor-pointer border-2 border-[#181c1e] bg-[#E7DBCA]  rounded-md"
            >
              Next
            </button>
          </div>
        </section>
        <section className="w-full px-8 sm:px-2 lg:px-6 xl:px-10 sm:w-3/6">
          <div className="  flex justify-between items-center w-full sm:w-[70%] lg:w-[88%] xl:w-[68%]">
            <h1 className="text-[#181C1E] text-lg sm:text-xl lg:text-3xl xl:text-4xl my-5 ">
              Leaderboard
            </h1>
            <p>
              <Link
                to="/leaderboard"
                className="underline  text-sm lg:text-base"
              >
                View all
              </Link>
            </p>
          </div>

          <div className=" sm:ml-5 text-xs sm:text-base xl:text-lg px-3 sm:px-1 sm:w-[65%] lg:w-[80%] xl:w-[63%]  flex justify-between items-center">
            <p>Rank</p>
            <p>Points</p>
          </div>

          {leaderBoardData?.map((leader, index) => (
            <LeaderBoard
              positions={positions[index]}
              key={index}
              userImage={leader.avatar}
              userName={leader.name}
              totalPoints={leader.totalPoints}
              rankIcon={<RankIcon className=" w-5 sm:w-6 lg:w-7" />}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
