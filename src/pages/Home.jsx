import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='sm:mx-[10%] mx-4'>
      <Header />
      <SpecialityMenu />
      <Banner />
      <TopDoctors />
    </div>
  )
}

export default Home