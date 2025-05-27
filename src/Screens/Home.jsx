import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import Layout from '../layout/Layout'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </Layout>
  );
}

export default Home
