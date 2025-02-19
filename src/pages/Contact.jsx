import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] text-[#e5d7f5] pt-20 py-10 px-6 md:px-12 rounded-2xl shadow-2xl'>

      {/* Contact Us Heading */}
      <div className='text-center text-2xl font-semibold text-white'>
        <p>CONTACT <span className='text-purple-400'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        {/* Contact Image */}
        <img className='w-full md:max-w-[360px] rounded-xl shadow-lg' src={assets.contact_image} alt="Contact Us" />

        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-white'>OUR OFFICE</p>
          <p className='text-gray-300'>MIT Moradabad</p>
          <p className='text-gray-300'>
            Tel: <span className="text-purple-400 font-medium">+91 9105220998</span> <br />
            Email: <span className="text-purple-400 font-medium">kumarguptaansh0@gmail.com</span>
          </p>

          <p className='font-semibold text-lg text-white'>Careers at MediLink</p>
          <p className='text-gray-300'>Learn more about our teams and job openings.</p>

          {/* Explore Jobs Button */}
          <button className='border border-purple-400 px-8 py-4 text-sm text-white rounded-md hover:bg-purple-500 hover:border-purple-500 transition-all duration-300'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
