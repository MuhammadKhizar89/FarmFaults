import React from "react";
import Arrow from "../../svgs/home/Arrow";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section
      className="flex justify-between flex-col-reverse gap-[20px] lg:flex-row px-[20px] py-[5px] sm:py-[20px] lg:py-[0px] lg:px-[50px] lg:h-screen max-h-[800px] overflow-hidden max-w-[1300px] mx-auto"
      id="banner"
    >
      <div className="flex flex-col justify-center md:w-[540px] gap-[10px]">
        <h1 className="promoTest leading-[40px] md:leading-[52px] font-bold text-[40px] md:text-[60px]">
          Spot the Errors.
          <br />
          Reap the Rewards!
        </h1>
        <p className="promoTest font-semibold md:text-[20px] lg:leading-[24px]">
          Turn your farming insights into points and help cultivate a smarter,
          healthier harvest.
        </p>
        <Link to='/signup' className="promoTest my-[20px] flex gap-[8px] items-center rounded-[12px] bg-tertiary/90 text-primary w-fit font-bold py-[9px] px-[24px]">
          Get Started
          <Arrow />
        </Link>
      </div>
      <div className="max-h-[650px] lg:w-[500px] overflow-hidden lg:overflow-visible">
        <div className="columns-2 gap-[15px] space-y-[15px] w-full">
          {farmImages.map((farmImage, idx) => (
            <div
              className={`break-inside-avoid flex-shrink-0 w-full h-[291px] landingPageImageShaddow ${
                idx > farmImages.length / 2 ? "" : "mt-[-40px]"
              }`}
              key={idx}
            >
              <img
                src={farmImage}
                className="w-full h-full object-cover landingPageImageShaddow"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const farmImages = [
  "/images/landingPage/farm1.png",
  "/images/landingPage/farm2.png",
  "/images/landingPage/farm3.png",
  "/images/landingPage/farm4.png",
  "/images/landingPage/farm5.png",
  "/images/landingPage/farm6.png",
];
