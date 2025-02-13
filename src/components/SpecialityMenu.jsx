import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-12 text-gray-800' id='speciality'>
      {/* Heading */}
      <h1 className='text-2xl sm:text-3xl font-medium text-center'>Find by Speciality</h1>
      <p className='sm:w-1/2 lg:w-1/3 text-center text-sm sm:text-base px-4'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Speciality List */}
      <div className='flex flex-wrap justify-center gap-6 pt-8 w-full'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-xs sm:text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className='w-16 sm:w-20 md:w-24 mb-2' src={item.image} alt={item.speciality} />
            <p className='text-lg font-semibold text-primary'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
