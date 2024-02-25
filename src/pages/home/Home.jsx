import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import BlogPostCard from "../../components/blogPostCard/BlogPostCard";
import Footer from "../../components/footer/Footer";
import SucessStory from "../SucessStory/SucessStory";

import "./home.css";
import GoMap from "../GoMap/GoMap";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Layout>
        <HeroSection />
        <div className="flex">
          <div className="w-1/12"></div>
          <div className="w-7/12">
            <BlogPostCard />
          </div>
          <div className="w-1/12"></div>
          <div className="w-3/12">
            <SucessStory />
          </div>
        </div>
        <GoMap />
      </Layout>
    </div>
  );
};

export default Home;
