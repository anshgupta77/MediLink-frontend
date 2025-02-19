// import React from 'react'
// import { assets } from '../assets/assets_frontend/assets'

// const About = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 text-gray-500'>
//         <p>ABOUT <span className='text-gray-700 font-medium'>US</span> </p>
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-12'>
//         <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600'>
//           <p>Welcome to MediLink, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediLink, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
//           <p>MediLink is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediLink is here to support you every step of the way</p>
//           <b className='text-gray-800'>Our Vision</b>
//           <p>Our vision at MediLink is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
//         </div>
//       </div>

//       <div className='text-xl my-4'>
//         <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
//       </div>

//       <div className='flex flex-col md:flex-row mb-20'>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>Efficiency:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>Convenience</b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>Personalization:</b>
//           <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default About











import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] text-[#e5d7f5] py-20 px-6 md:px-12 rounded-2xl shadow-2xl '>
      <div className='sm:mx-[10%] mx-4'>
            {/* About Us Heading */}
            <div className='text-center text-2xl font-semibold text-white'>
              <p>ABOUT <span className='text-purple-400'>US</span></p>
            </div>

            {/* About Content */}
            <div className='my-10 flex flex-col md:flex-row gap-12'>
              <img className='w-full md:max-w-[360px] rounded-xl shadow-lg' src={assets.about_image} alt="About Us" />
              <div className='flex flex-col justify-center gap-6 md:w-1/2 text-base text-gray-300'>
                <p>Welcome to <span className="text-purple-400 font-semibold">MediLink</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when scheduling doctor appointments and managing health records.</p>
                <p>At <span className="text-purple-400 font-semibold">MediLink</span>, we are committed to excellence in healthcare technology. Our platform continuously evolves, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediLink is here to support you every step of the way.</p>
                <b className='text-white text-lg'>Our Vision</b>
                <p>Our vision is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access care when you need it.</p>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='text-center text-2xl font-semibold text-white mt-16'>
              <p>WHY <span className='text-purple-400'>CHOOSE US</span></p>
            </div>

            <div className='flex flex-col md:flex-row mt-10 gap-6'>
              {/* Feature Cards */}
              {[
                { title: "Efficiency", desc: "Streamlined appointment scheduling that fits into your busy lifestyle." },
                { title: "Convenience", desc: "Access to a network of trusted healthcare professionals in your area." },
                { title: "Personalization", desc: "Tailored recommendations and reminders to help you stay on top of your health." }
              ].map((item, index) => (
                <div key={index} className='flex-1 border border-white/10 bg-white/5 p-8 md:p-12 rounded-xl shadow-lg text-gray-300 
                                            hover:bg-purple-500/10 hover:text-white transition-all duration-300 cursor-pointer'>
                  <b className="text-lg text-white">{item.title}:</b>
                  <p className="mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default About
