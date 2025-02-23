
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, Calendar } from 'lucide-react';

const Doctors = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { doctors, setSpeciality, speciality, search, setSearch } = useContext(AppContext);

  let {specialityData} = useParams();
  useEffect(() => {
    setSpeciality(specialityData);
  }, [specialityData]);


  return (
    <div className="bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] p-6 rounded-2xl">
      <div className='sm:mx-[5%] mx-4'>

     
              {/* Hero Section with Search */}
              <div className="py-8 px-4 mb-8">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-white mb-4 text-center">
                    Find Your Healthcare <span className="text-purple-400">Specialist</span>
                  </h1>
                  <p className="text-gray-300 text-center mb-8">
                    Browse through our network of trusted medical professionals
                  </p>
                  
                  {/* Search Container */}
                  <div className="relative mx-auto">
                    <div className={`
                      flex items-center bg-white/5 border border-white/20 rounded-full shadow-xl
                      transition-all duration-300 backdrop-blur-sm
                      ${isSearchFocused ? 'ring-2 ring-purple-400 shadow-2xl' : ''}
                    `}>
                      <div className="pl-6">
                        <Search className="w-5 h-5 text-gray-300" />
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Search doctor by name or specialty..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full py-4 px-4 bg-transparent text-white placeholder-gray-400 rounded-full outline-none"
                      />
                      
                      <button 
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full mr-2 transition-colors"
                      >
                        Search
                      </button>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <button className="px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium text-gray-300">
                        Frequent Searches 
                      </button>
                      <button 
                        className="px-4 py-1.5 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-purple-500/30 transition-colors border border-white/10"
                        onClick={() => setSearch("Dr. Amelia Hill")}
                      >
                        Dr. Amelia Hill 
                      </button>
                      <button 
                        className="px-4 py-1.5 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-purple-500/30 transition-colors border border-white/10"
                        onClick={() => setSearch("Dr. Davis Lawerence")}
                      >
                        Dr. Davis Lawerence
                      </button>
                      <button 
                        className="px-4 py-1.5 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:bg-purple-500/30 transition-colors border border-white/10"
                        onClick={() => {setSearch("Dermatologist")}}
                      >
                        Dermatologist
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Doctors Grid */}
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* Filter Toggle Button */}
                <button 
                  className={`py-2 px-4 rounded-lg text-sm transition-all sm:hidden border border-white/20
                    ${showFilter ? "bg-purple-500 text-white" : "bg-white/5 text-gray-300"}`} 
                  onClick={() => setShowFilter(prev => !prev)}
                >
                  Filters
                </button>

                {/* Filter Options */}
                <div className={`flex-col gap-4 text-sm ${showFilter ? "flex" : "hidden sm:flex"}`}>
                  {[
                    "General physician",
                    "Gynecologist",
                    "Dermatologist",
                    "Pediatrician",
                    "Neurologist",
                    "Gastroenterologist"
                  ].map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => speciality === specialty ? setSpeciality(false) : setSpeciality(specialty)}
                      className={`w-[94vw] sm:w-48 px-4 py-2 rounded-lg transition-all text-left
                        ${speciality === specialty 
                          ? "bg-purple-500/30 text-white border-purple-400" 
                          : "bg-white/5 text-gray-300 border-white/20"
                        } border hover:bg-purple-500/20`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>

                {/* Doctors Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                  {doctors.slice(0, 8).map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => { 
                        navigate(`/appointments/${item._id}`); 
                        scrollTo(0, 0); 
                      }} 
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer 
                              transform transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <img 
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                          src={item.image} 
                          alt={item.name} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1445] via-transparent to-transparent"/>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Availability Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                          ${item.available 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${item.available ? "bg-green-400" : "bg-gray-400"}`}/>
                          {item.available ? "Available Now" : "Currently Unavailable"}
                        </div>

                        {/* Doctor Info */}
                        <div className="space-y-2">
                          <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {item.name}
                          </h2>
                          <p className="text-gray-400">{item.speciality}</p>
                        </div>

                        {/* Book Now Button */}
                        <button className="w-full mt-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-300 
                                        group-hover:bg-purple-500 group-hover:text-white transition-all duration-300
                                        flex items-center justify-center gap-2">
                          <Calendar size={16}/>
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
      </div>
    </div>
  );
};

export default Doctors;