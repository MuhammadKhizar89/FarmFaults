import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import RankIcon from "../svgs/dashboardSvgs/Rank.svg";
import Loader from "../svgs/Loader";
import LeaderBoard from "../components/dashboard/LeaderBoard";
import RecentActivity from "../components/dashboard/RecentActivity";

import {
  getUserStats,
  recentErrors,
  dashboard_leaderboardTopUsers,
} from "../apis/dashboard.api";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "User" });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalErrors: 0,
    rank: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const positions = ["1st", "2nd", "3rd", "4th", "5th"];

  const handleNextPage = () => setPageNumber((prev) => prev + 1);
  const handlePreviousPage = () => {
    setButtonDisable(false);
    if (pageNumber > 0) setPageNumber((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const userStats = await getUserStats();

      if (userStats.success) {
        setUser(userStats.user);
        setStats(userStats.stats);
        const leaderboardResponse = await dashboard_leaderboardTopUsers();
        setLeaderBoardData(leaderboardResponse.data);
      } else {
        toast.error(userStats.message);
      }
      setLoading(false);
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recentErrors(pageNumber);
        setRecentActivity(response.data.formattedErrors);
        setButtonDisable(response.data.disableNextButton);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const { totalPoints, totalErrors, rank } = stats;

  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center bg-primary">
        <Loader color="#181C1E" className="w-10 h-10 animate-spin" />
        <h1 className="text-tertiary py-3 text-lg font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="pt-10 bg-primary w-full pb-16 min-h-screen">
      {/* Mobile Report Button */}
      <div className="visible lg:hidden text-white fixed left-1/2 bottom-[3%] transform -translate-x-1/2 border bg-tertiary py-1 px-3 rounded-xl">
        <Link to="/report-error">Report an error</Link>
      </div>

      {/* Welcome Message */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-tertiary ml-6 lg:ml-10 mt-5">
        Welcome Back,{" "}
        {`${user.firstName || ""} ${user.lastName || ""}`.trim() || user.name}!
      </h1>

      {/* Stats Section */}
      {totalPoints || totalErrors || rank ? (
        <section className="bg-secondary text-tertiary flex justify-around items-center text-xs md:text-sm lg:text-lg xl:text-xl w-[70%] sm:w-[45%] md:w-[50%] xl:w-[40%] sm:px-3 py-3 xl:py-4 rounded-lg sm:rounded-2xl lg:rounded-3xl mt-6 lg:mt-10 mx-auto mb-5">
          <div className="flex flex-col items-center">
            <p className="mb-1">{rank}</p>
            <p className="px-4 rounded-3xl border-2 border-tertiary">Rank</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-1">{totalPoints}</p>
            <p className="px-4 rounded-3xl border-2 border-tertiary">Points</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-1">{totalErrors}</p>
            <p className="px-4 rounded-3xl border-2 border-tertiary">Errors</p>
          </div>
        </section>
      ) : (
        <p className="mt-5 text-center text-tertiary">Loading stats...</p>
      )}

      <section className="sm:flex sm:ml-5 lg:ml-10">
        {/* Recent Activity */}
        <section className="px-2 sm:w-3/6">
          <h1 className="text-tertiary text-lg lg:text-3xl xl:text-4xl my-2 sm:my-5 pl-5 sm:pl-0">
            Recent Activity
          </h1>
          <section
            className={`custom-scrollbar ${
              recentActivity.length <= 8 ? "h-auto" : "sm:max-h-[300px] lg:max-h-[410px]"
            } px-3 mx-2 sm:mx-0 lg:px-0`}
          >
            {recentActivity.map((activity, index) => (
              <RecentActivity
                key={index}
                imageSrc={activity.user.avatar}
                username={`${activity.user.firstName} ${activity.user.lastName}`}
                errorType={activity.errorType}
                points={activity.points}
              />
            ))}
          </section>

          {/* Pagination */}
          <div className="flex justify-evenly items-center my-5 lg:my-7 text-xs sm:text-sm lg:text-base">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber === 0}
              className="px-3 py-1 cursor-pointer border-2 border-tertiary bg-secondary rounded-md"
            >
              Previous
            </button>
            <p>Page No: {pageNumber + 1}</p>
            <button
              onClick={handleNextPage}
              disabled={buttonDisable}
              className="px-3 cursor-pointer py-1 border-2 border-tertiary bg-secondary rounded-md"
            >
              Next
            </button>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="w-full px-8 sm:px-2 lg:px-6 xl:px-10 sm:w-3/6">
          <div className="flex justify-between items-center w-full sm:w-[70%] lg:w-full ">
            <h1 className="text-tertiary text-lg sm:text-xl lg:text-3xl xl:text-4xl my-5">
              Leaderboard
            </h1>
            <p>
              <Link
                to="/leaderboard"
                className="underline text-sm lg:text-base text-tertiary"
              >
                View all
              </Link>
            </p>
          </div>

          <div className=" text-xs sm:text-base xl:text-lg px-3 sm:px-1 sm:w-[65%] lg:w-full flex justify-between items-center text-tertiary">
            <p>Rank</p>
            <p>Points</p>
          </div>

          {leaderBoardData.map((leader, index) => (
            <LeaderBoard
              key={index}
              positions={positions[index]}
              userImage={leader.avatar}
              userName={leader.name}
              totalPoints={leader.totalPoints}
              rankIcon={<RankIcon className="w-5 sm:w-6 lg:w-7" />}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
