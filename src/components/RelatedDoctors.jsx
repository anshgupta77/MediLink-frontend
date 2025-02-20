// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';

// const RelatedDoctors = ({ speciality, docId }) => {

//     const { doctors } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [relDoc, setRelDoc] = useState([]);

//     useEffect(() => {
//         if (doctors.length > 0 && speciality) {
//             const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
//             setRelDoc(doctorsData);
//         }
//         const relatedDoc = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
//         setRelDoc(relatedDoc);
//     }, [doctors, speciality, docId])
//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
//             <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {relDoc.slice(0, 5).map((item, index) => (
//                     <div onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 group' key={index}>
//                         <img className='bg-blue-50 group-hover:bg-primary' src={item.image} alt="Doctor" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}>
//                                 <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full`}></p><p>{item.available ? "Available" : "Not Available"}</p>
//                             </div>
//                             <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                             <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={() => { navigate("/doctors"); scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
//         </div>
//     )
// }

// export default RelatedDoctors




import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 mb-12 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Top Doctors to Book
          </h1>
          <p className="text-gray-300 sm:w-1/3 text-sm">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointments/${item._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-105"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <img
                  src={item.image}
                  alt="Doctor"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      item.available ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-purple-300">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-all duration-300"
          >
            View More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedDoctors;