import React from "react";
import Banner from "../components/landingPage/Banner";
import HowItWorks from "../components/landingPage/HowItWorks";
import Footer from "../components/landingPage/Footer";
import Contribution from "../components/landingPage/Contribution";
import Navbar from "../components/landingPage/Navbar";
import ExploreFeatures from "../components/landingPage/ExploreFeatures";

export default function Home() {
  return (
    <main className="promoTest bg-primary">
      <Navbar/>
      <Banner />
      <p className="promoTest text-[20px] md:text-[32px] font-medium text-center md:leading-[38px] px-2 md:px-[100px] py-[100px] bg-secondary">
        Welcome to the Farmer's Error-Finding Game—empower your community by
        spotting and reporting farming errors. Earn points, improve practices,
        and drive smarter, more efficient agriculture.
      </p>
      <HowItWorks />
      <ExploreFeatures/>
      <Contribution />
      <Footer />
    </main>
  );
}
