import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { ArrowRight, Heart } from 'lucide-react';

const Header = () => {
    return (
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700'>
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute bottom-10 right-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-pulse delay-700'></div>
            </div>

            <div className='relative flex flex-col md:flex-row flex-wrap px-6 md:px-4 lg:px-20 '>
                {/* Left Side */}
                <div className='flex flex-col md:w-1/2 items-start justify-center gap-6 py-10 m-auto md:py-[3vw]'>
                    <div className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80'>
                        <Heart size={16} className="animate-pulse text-pink-300" />
                        <span className='text-sm'>Trusted Healthcare Platform</span>
                    </div>

                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight md:leading-tight lg:leading-tight animate-slideUp'>
                        Book Appointment <br /> 
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300'>
                            With Trusted Doctors
                        </span>
                    </h1>

                    <div className='flex flex-col md:flex-row items-center gap-4 text-white/80 text-sm delay-200'>
                        <div className='relative'>
                            <img 
                                className='w-28 hover:scale-105 transition-transform duration-300' 
                                src={assets.group_profiles} 
                                alt="Group Image"
                            />
                            <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs text-white font-medium animate-bounce'>
                                +5
                            </div>
                        </div>
                        <p className=' bg-white/5 p-4 rounded-lg'>
                            Simply browse through our extensive list of trusted doctors, 
                            <br className='hidden sm:block' /> 
                            schedule your appointment hassle-free.
                        </p>
                    </div>

                    <a 
                        href="#speciality" 
                        className='group flex items-center gap-2 bg-white px-8 py-3 rounded-full text-indigo-600 font-medium text-sm 
                                 hover:bg-indigo-50 transition-all duration-300 animate-slideUp delay-300
                                 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30'
                    >
                        Book Appointment 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Right Side */}
                <div className='md:w-1/2 relative delay-500'>
                    <div className='absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-lg'></div>
                    <img 
                        className='w-full md:absolute bottom-0 h-full object-contain rounded-lg 
                                 hover:scale-105 transition-transform duration-500 ease-out' 
                        src={assets.header_img} 
                        alt="Doctor"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;

// Add these keyframes to your global CSS or styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
    }

    .animate-slideUp {
        animation: slideUp 1s ease-out forwards;
    }

    .delay-200 {
        animation-delay: 200ms;
    }

    .delay-300 {
        animation-delay: 300ms;
    }

    .delay-500 {
        animation-delay: 500ms;
    }

    .delay-700 {
        animation-delay: 700ms;
    }
`;
document.head.appendChild(style);