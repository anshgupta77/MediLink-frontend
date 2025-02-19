// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets_frontend/assets'

// const Banner = () => {

//   const navigate = useNavigate();

//   return (
//     <div className='flex bg-[#3828cc] text-[#d3bccc] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

//       {/* ---------- Left Side ---------- */}
//       <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
//         <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//           <p>Book Appointment </p>
//           <p className='mt-4'>With 100+ Trusted Doctors</p>
//         </div>
//         <button onClick={() => {navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create account</button>
//       </div>

//       {/* ---------- Right Side ---------- */}
//       <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//         <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
//       </div>
//     </div>
//   )
// }

// export default Banner






import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { ArrowRight, Heart } from 'lucide-react';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 h-1/2 '>
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute bottom-10 right-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-pulse delay-700'></div>
            </div>

            <div className='relative flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 '>
                {/* Left Side */}
                <div className='flex flex-col md:w-1/2 items-start justify-center gap-6 py-5 m-auto md:py-[9vw]'>
                <div className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 animate-fadeIn'>
                        <span className='text-sm'>Your Health, Our Priority</span>
                    </div>

                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-tight lg:leading-tight animate-slideUp'>
                        Schedule Your Visit <br /> 
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300'>
                            With Top-Rated Specialists
                        </span>
                    </h1>

                    <button 
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0); }} 
                        className='group flex items-center gap-2 bg-white px-8 py-3 rounded-full text-indigo-600 font-medium text-sm 
                                 hover:bg-indigo-50 transition-all duration-300 animate-slideUp delay-300
                                 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30'
                    >
                        Create Account
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Side */}
                <div className='md:w-1/2 relative animate-fadeIn delay-500'>
                    <div className='absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-lg'></div>
                    <img 
                        className='w-full md:absolute bottom-0 h-auto object-cover rounded-lg 
                                 hover:scale-105 transition-transform duration-500 ease-out' 
                        src={assets.appointment_img} 
                        alt="Doctor"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;