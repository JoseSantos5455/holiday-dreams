import React from "react";
import Banner from "../../components/Banner/Banner";
import Benefit from "../../components/Benefit/Benefit";
import Reviews from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import Tours from "../../components/Tours/Tours";


const Home = () => {
  //Home Page
  return (
    <>
      <Banner />
      <Benefit />
      <Tours />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;
