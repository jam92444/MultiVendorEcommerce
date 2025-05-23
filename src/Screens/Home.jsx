import React from 'react'
import Input from '../Components/UI/Input'
import UserLayout from '../layout/UserLayout'

const Home = () => {
  return (
    <UserLayout>
      <Input border="none" outline='1px solid blue' background='transparent' color='black' placeholder='Enter your name' width='200px' padding='.6rem 1rem'  borderRadius="25px" />
    </UserLayout>
  )
}

export default Home
