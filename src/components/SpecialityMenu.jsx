import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SpecialityMenu = () => {
  return (
    <div className='py-16' id='speciality'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-16 space-y-4'>
          <div className='inline-block px-4 py-1 bg-indigo-500/10 rounded-full text-indigo-300 text-sm mb-4'>
            Our Specialities
          </div>
          
          <h1 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
            Find by <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300'>Speciality</span>
          </h1>
          
          <p className='max-w-2xl mx-auto text-indigo-200/80 text-sm sm:text-base'>
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>

        {/* Speciality Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6'>
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className='group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300
                       hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1'
            >
              <div className='flex flex-col items-center space-y-4'>
                {/* Image Container */}
                <div className='relative'>
                  <div className='absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-300'></div>
                  <img 
                    className='w-16 sm:w-20 relative z-10 transition-transform duration-300 group-hover:scale-110' 
                    src={item.image} 
                    alt={item.speciality}
                  />
                </div>

                {/* Speciality Name */}
                <div className='text-center space-y-2'>
                  <h3 className='text-white font-medium text-sm sm:text-base'>
                    {item.speciality}
                  </h3>
                  
                  {/* View Details Button - Only visible on hover */}
                  <div className='overflow-hidden h-0 group-hover:h-8 transition-all duration-300'>
                    <button className='flex items-center justify-center gap-2 text-xs text-indigo-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      View Details
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className='absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute top-2 right-2 w-2 h-2 bg-indigo-400 rounded-full'></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu
