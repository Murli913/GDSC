import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import BlogPostCard from '../../components/blogPostCard/BlogPostCard'
import Footer from '../../components/footer/Footer'
import SucessStory from '../SucessStory/SucessStory'

import "./home.css";
import GoMap from '../GoMap/GoMap'

const Home = () => {
  return (
    <Layout>
       

      <HeroSection/>
      <div class="container">
  <div class="major-part">
    <BlogPostCard/>
  </div>
  <div class="minor-part">
  <div class="carousel">
 <SucessStory/>
  </div>
  </div>
</div>
<GoMap/>
    </Layout>
  )
}

export default Home