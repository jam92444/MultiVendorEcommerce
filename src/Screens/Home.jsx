import React from 'react'
import UserLayout from '../layout/UserLayout'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'

const Home = () => {
  return (
    <UserLayout>
       <Hero/>
       <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    </UserLayout>
  )
}

export default Home
