import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import BlogPostCard from "../../components/blogPostCard/BlogPostCard";
import Footer from "../../components/footer/Footer";
import SucessStory from "../SucessStory/SucessStory";

import "./home.css";

const Home = () => {
  return (
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
    </Layout>
  );
};

export default Home;
