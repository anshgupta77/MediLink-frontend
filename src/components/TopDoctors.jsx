
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Calendar, ArrowRight } from 'lucide-react';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='relative flex flex-col items-center gap-8 px-6 md:px-10 text-[#e5d7f5] py-16'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMjVsNiA2TDI1IDYySDYybC02LTZMMjUgMjV6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] opacity-20"/>

            {/* Header Section */}
            <div className="relative text-center space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium backdrop-blur-sm">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"/>
                    Live Consultations Available
                </div>
                <h1 className='text-4xl md:text-5xl font-bold text-white'>
                    Top Doctors to Book
                </h1>
                <p className='text-center text-base md:text-lg text-gray-300/90 max-w-xl mx-auto'>
                    Connect with our experienced specialists for personalized care and expert medical advice.
                </p>
            </div>

            {/* Doctors Grid */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8'>
                {doctors.slice(0, 8).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0); }} 
                        className='group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer 
                                 transform hover:scale-102 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5'
                    >
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                            <img 
                                className='w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1445] via-transparent to-transparent"/>
                        </div>

                        {/* Content */}
                        <div className='p-6 space-y-4'>
                            {/* Availability Badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                                ${item.available 
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                                    : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? "bg-green-400" : "bg-gray-400"}`}/>
                                {item.available ? "Available Now" : "Currently Unavailable"}
                            </div>

                            {/* Doctor Info */}
                            <div className="space-y-2">
                                <h2 className='text-xl font-bold text-white group-hover:text-purple-300 transition-colors'>
                                    {item.name}
                                </h2>
                                <p className='text-gray-400'>{item.speciality}</p>
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

            {/* View More Button */}
            {console.log("Doctors: ", doctors)}
        
                <button 
                    onClick={() => {
                        console.log("Navigating...");
                        navigate("/doctors");
                        scrollTo(0, 0);
                    }}
                    className='group mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white 
                            font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300
                            flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30
                            relative z-50'
                >
                    View All Doctors
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>

        </div>
    );
}

export default TopDoctors;

