import React from "react";
import SpotAnError from "../../svgs/home/SpotAnError";
import ReporIt from "../../svgs/home/ReporIt";
import EarnPoints from "../../svgs/home/EarnPoints";
import ViewErrors from "../../svgs/home/ViewErrors";

function HowItWorkBox({ heading, para, icon }) {
  return (
    <div className="w-[293px] h-[310px] rounded-[10px] bg-primary flex flex-col items-center justify-centers py-10 px-4 gap-[2px]">
      {icon}
      <h2 className="text-[29px] font-semibold">{heading}</h2>
      <p className="text-[20px] font-semibold leading-[27px] text-center">
        {para}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-secondary px-2 pb-20" id="work">
      <h1 className="text-[42px] promoTest font-semibold text-center">
        How It Works?
      </h1>
      <div className="flex gap-[15px] justify-center flex-wrap mt-[50px]">
        <HowItWorkBox
          heading="Spot An Error"
          para="Notice something off in the fields? It could be a pest problem, soil issue, or irrigation mishap."
          icon={<SpotAnError className="w-[55px]" />}
        />
        <HowItWorkBox
          heading="Report IT"
          para="Select the error type, upload photos, add a description, and pinpoint the location on our interactive map."
          icon={<ReporIt className="w-[55px]" />}
        />
        <HowItWorkBox
          heading="Report An Error"
          para="For every valid submission, earn points and track your progress on your personalized dashboard."
          icon={<EarnPoints className="w-[55px]" />}
        />
        <HowItWorkBox
          heading="View Errors"
          para="Check out the map to see all reported errors in your area and beyond."
          icon={<ViewErrors className="w-[55px]" />}
        />
      </div>
    </section>
  );
}
