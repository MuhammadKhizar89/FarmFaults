import React from "react";
import DashboardSvg from "../../svgs/home/Dashboard.svg";
import FriendlyDesign from "../../svgs/home/FriendlyDesign.svg";
import InteractiveMapSvg from "../../svgs/home/InteractiveMap.svg";

const ExploreFeatures = () => {
  return (
    <section
      className="flex flex-col lg:flex-row justify-center bg-primary px-4 py-8 lg:px-28 lg:py-20"
      id="exploreFeatures"
    >
      <div className=" lg:w-[60%] space-y-4 md:space-y-7 pb-10 lg:pb-0">
        <div className=" space-y-3 border-l-2 pl-2 border-[#181C1E]">
          <h4 className="text-4xl">Explore our features!</h4>
          <p className="sm:w-[70%] lg:w-[75%]">
            Earn points and make an impact. Your reports help farmers improve
            yields and crop health, all while enjoying a fun, competitive game.
          </p>
        </div>
        <div className="flex  gap-5 lg:justify-normal w-fit sm:w-[70%] mx-auto lg:mx-0 lg:w-[90%] xl:w-[70%] py-2 px-4 bg-secondary">
          <div>
            <DashboardSvg className=" mt-3" />
          </div>
          <div>
            <h1 className=" font-extrabold promoTest text-lg xl:text-xl">
              User Dashboard
            </h1>
            <p className=" sm:w-[60%] md:w-[70%] lg:w-[90%] xl:w-[80%] text-xs sm:text-sm xl:text-base">
              Track your points, view recent activities and monitor your
              contributions
            </p>
          </div>
        </div>
        <div className="flex  gap-5 lg:justify-normal w-fit sm:w-[70%] mx-auto lg:mx-0 lg:w-[90%] xl:w-[70%] py-2 px-4 bg-secondary">
          <div>
            <InteractiveMapSvg
              className=" mt-3"
              fill="#000000"
              fillOpacity={1}
            />
          </div>
          <div>
            <h1 className=" font-extrabold promoTest text-lg xl:text-xl">
              Interactive Map
            </h1>
            <p className=" sm:w-[60%] md:w-[70%] lg:w-[90%] xl:w-[80%] text-xs sm:text-sm xl:text-base">
              See all reported errors at a glance with markers indicating
              specific issues
            </p>
          </div>
        </div>
        <div className="flex  gap-5 lg:justify-normal w-fit sm:w-[70%] mx-auto lg:mx-0 lg:w-[90%] xl:w-[70%] py-2 px-4 bg-secondary">
          <div>
            <FriendlyDesign className=" mt-3" />
          </div>
          <div>
            <h1 className=" font-extrabold promoTest text-lg xl:text-xl">
              Friendly Design
            </h1>
            <p className=" sm:w-[60%] md:w-[70%] lg:w-[90%] xl:w-[80%] text-xs sm:text-sm xl:text-base">
              Access on any device, whether you're in the field or at home
            </p>
          </div>
        </div>
      </div>
      <div className="h-[80vh] lg:w-[40%]  bg-secondary">
        <img
          className="w-full h-full object-cover"
          src="/images/landingPage/exploreFeatures.jpg"
          alt="exploreFeatures"
        />
      </div>
    </section>
  );
};

export default ExploreFeatures;
