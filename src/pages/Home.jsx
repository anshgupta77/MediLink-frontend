import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] pt-4'>
      <div className='sm:mx-[10%] mx-4'>
        <Header />
        <SpecialityMenu />
        <Banner />
        <TopDoctors />
      </div>
    </div>
  )
}

export default Home