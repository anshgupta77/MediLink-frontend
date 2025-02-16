// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import search_icon from "../assets/assets_frontend/search.png"

// const Doctors = () => {

//   const [showFilter, setShowFilter] = useState(false);
//   const navigate = useNavigate();

//   const { doctors, setSpeciality, speciality, search, setSearch } = useContext(AppContext);

//   return (
//     <div>
//       <div className='flex flex-row justify-between items-center'> 
//         <p className='text-gray-600'>Browse through the doctors specialist.</p>
//         <div className='flex flex-row items-center w-full sm:w-1/2 p-2 border-2 border-collapse border-gray-300 rounded sm:pl-3 rounded-full outline-none hover:border-primary'>
//           <input
//             type="text"
//             placeholder="Search doctor by name!"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className='outline-none border-collapse border-none w-full font-semibold text-gray-500'
//           />
//           <img src={search_icon} alt="" className='w-6 h-6 font-semibold'/>
//         </div>

//       </div>

//       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
//         <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : " "}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
//         <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex " : "hidden sm:flex"}`}>
//           <p onClick={() => speciality === "General physician" ? setSpeciality(false) : setSpeciality("General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
//           <p onClick={() => speciality === "Gynecologist" ? setSpeciality(false) : setSpeciality("Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
//           <p onClick={() => speciality === "Dermatologist" ? setSpeciality(false) : setSpeciality("Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
//           <p onClick={() => speciality === "Pediatrician" ? setSpeciality(false) : setSpeciality("Pediatrician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>Pediatrician</p>
//           <p onClick={() => speciality === "Neurologist" ? setSpeciality(false) : setSpeciality("Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
//           <p onClick={() => speciality === "Gastroenterologist" ? setSpeciality(false) : setSpeciality("Gastroenterologist")} 
//           className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
//         </div>
//         <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
//           {
//             doctors.map((item, index) => (
//               <div onClick={() => navigate(`/appointments/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group' key={index}>
//                 <img className='bg-blue-50 group-hover:bg-primary' src={item.image} alt="Doctor" />
//                 <div className='p-4'>
//                   <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
//                     <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}></p><p>{item.available ? "Available" : "Not Available"}</p>
//                   </div>
//                   <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                   <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Doctors








import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import search_icon from "../assets/assets_frontend/search.png"
import { Search } from 'lucide-react'

const Doctors = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { doctors, setSpeciality, speciality, search, setSearch } = useContext(AppContext);

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 px-4 rounded-2xl mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-4 text-center">
            Find Your Healthcare Specialist
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Browse through our network of trusted medical professionals
          </p>
          
          {/* Search Container */}
          <div className="relative max-w-2xl mx-auto">
            <div className={`
              flex items-center bg-white rounded-full shadow-md
              transition-all duration-300 
              ${isSearchFocused ? 'ring-2 ring-primary shadow-lg' : ''}
            `}>
              {/* Search Icon */}
              <div className="pl-6">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search doctor by name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-4 px-4 text-gray-700 placeholder-gray-400 rounded-full outline-none"
              />
              
              {/* Search Button */}
              <button 
                className="bg-primary hover:bg-primary/90 text-white px-3 py-1 text-md rounded-full mr-2 transition-colors"
                onClick={() => {/* Add search function here */}}
              >
                Search
              </button>
            </div>

            {/* Quick Filters */}
            
            <div className="flex flex-wrap gap-2 justify-center mt-4">
            <button 
                className="px-4 py-1.5 bg-gray-400 rounded-full text-sm font-medium text-white "
              >
                Frequent Searches 
              </button>
              <button 
                className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 hover:bg-primary hover:text-white transition-colors shadow-sm"
                onClick={() => setSearch("Dr. Amelia Hill")}
              >
                Dr. Amelia Hill 
              </button>
              <button 
                className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 hover:bg-primary hover:text-white transition-colors shadow-sm"
                onClick={() => setSearch("Dr. Davis Lawerence")}
              >
                Dr. Davis Lawerence
              </button>
              <button 
                className="px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 hover:bg-primary hover:text-white transition-colors shadow-sm"
                onClick={() => {setSearch("Dermatologist")} }
              >
                Dermatologist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <div className='flex flex-col sm:flex-row items-start gap-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : " "}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex " : "hidden sm:flex"}`}>
          <p onClick={() => speciality === "General physician" ? setSpeciality(false) : setSpeciality("General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === "Gynecologist" ? setSpeciality(false) : setSpeciality("Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === "Dermatologist" ? setSpeciality(false) : setSpeciality("Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === "Pediatrician" ? setSpeciality(false) : setSpeciality("Pediatrician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>Pediatrician</p>
          <p onClick={() => speciality === "Neurologist" ? setSpeciality(false) : setSpeciality("Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === "Gastroenterologist" ? setSpeciality(false) : setSpeciality("Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {doctors.map((item, index) => (
            <div onClick={() => navigate(`/appointments/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group' key={index}>
              <img className='bg-blue-50 group-hover:bg-primary' src={item.image} alt="Doctor" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
                  <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}></p><p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors