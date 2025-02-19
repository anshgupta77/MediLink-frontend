// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets_frontend/assets';
// import RelatedDoctors from '../components/RelatedDoctors';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
//   const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const navigate = useNavigate();

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");


//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId);
//     setDocInfo(docInfo);
//   }

  // const getAvailableSlots = async () => {
  //   setDocSlots([]);

  //   // getting current date
  //   let today = new Date()

  //   for (let i = 0; i < 7; i++) {
  //     //getting date with index
  //     let currentDate = new Date(today)
  //     currentDate.setDate(today.getDate() + i);

  //     // setting end time of the date with index
  //     let endTime = new Date()
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(21, 0, 0, 0);

  //     // setting hours
  //     if (today.getDate() === currentDate.getDate()) {
  //       const currentHour = currentDate.getHours();
  //       const currentMinutes = currentDate.getMinutes();

  //       // Start at the next available half-hour slot
  //       if (currentHour >= 10) {
  //         currentDate.setHours(currentHour + 1);
  //         currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
  //       } else {
  //         currentDate.setHours(10);
  //         currentDate.setMinutes(0);
  //       }
  //     } else {
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];

  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  //       let day = currentDate.getDate();
  //       let month = currentDate.getMonth() + 1;
  //       let year = currentDate.getFullYear();

  //       const slotDate = day + "_" + month + "_" + year;
  //       const slotTime = formattedTime;

  //       const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

  //       if (isSlotAvailable) {
  //         // Available slots added to array
  //         timeSlots.push({
  //           datetime: new Date(currentDate),
  //           time: formattedTime
  //         });
  //       }

  //       // increment time by 30 minutes
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }

  //     setDocSlots(prev => ([...prev, timeSlots]));
  //   }
  // }

  // const bookAppointment = async () => {

  //   if (!token) {
  //     toast.warn("Please login to book an appointment");
  //     return navigate('/login');
  //   }

  //   try {

  //     const date = docSlots[slotIndex][0].datetime;
  //     let day = date.getDate();
  //     let month = date.getMonth() + 1;
  //     let year = date.getFullYear();

  //     const slotDate = day + "_" + month + "_" + year;

  //     const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });
  //     if (data.success) {
  //       toast.success(data.message);
  //       getDoctorsData();
  //       navigate('/my-appointments');
  //     } else {
  //       toast.error(data.message);
  //     }

  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response.data.message || "Something went wrong");
  //   }
  // }

  // useEffect(() => {
  //   fetchDocInfo();
  // }, [doctors, docId]);

  // useEffect(() => {
  //   if (docInfo) {
  //     getAvailableSlots();
  //   }
  // }, [docInfo]);  // Ensure you fetch slots only when `docInfo` is available


  // useEffect(() => {
  //   console.log(docSlots);
  // }, [docSlots]);

//   return docInfo && (
//     <div>
//       {/* ---------- Doctor's Detail ---------- */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* Doctor's Image */}
//         <div>
//           <img src={docInfo.image} alt="Doctor" className="w-full bg-primary sm:max-w-72 rounded-lg" />
//         </div>

//         {/* Doctor's Info */}
//         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           {/* Doctor's Name and Verified Icon */}
//           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt="Verified" />
//           </p>

//           {/* Degree, Specialty, and Experience */}
//           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className="px-2 py-0.5 border text-xs rounded-full">
//               {docInfo.experience} years of experience
//             </button>
//           </div>

//           {/* Doctor About */}
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//               About
//               <img src={assets.info_icon} alt="Info" />
//             </p>
//             <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* ---------- Booking slots ---------- */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking Slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item, index) => (
//               <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200 "}`}>
//                 <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))
//           }
//         </div>

//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
//             <p key={index} onClick={() => setSlotTime(item.time)} className={`text-am font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "border border-gray-200 "}`}>
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>
//         <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//       </div>

//       {/* Listing Related Doctors */}
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//     </div>
//   );
// }

// export default Appointment;









import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Info, CheckCircle, Calendar } from 'lucide-react';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Existing functions remain the same
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        // Start at the next available half-hour slot
        if (currentHour >= 10) {
          currentDate.setHours(currentHour + 1);
          currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          // Available slots added to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        // increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate('/login');
    }

    try {

      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);  // Ensure you fetch slots only when `docInfo` is available


  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && (
    <div className="bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] p-6 rounded-2xl">
      <div className='sm:mx-[10%] mx-4'>

            {/* Doctor's Detail Section */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Doctor's Image */}
              <div className="sm:w-72">
                <div className="relative group overflow-hidden rounded-2xl border border-white/10">
                  <img 
                    src={docInfo.image} 
                    alt={docInfo.name} 
                    className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1445] via-transparent to-transparent"/>
                </div>
              </div>

              {/* Doctor's Info */}
              <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
                {/* Name and Verification */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{docInfo.name}</h1>
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap items-center gap-3 text-gray-300">
                  <span>{docInfo.degree} - {docInfo.speciality}</span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm">
                    {docInfo.experience} years of experience
                  </span>
                </div>

                {/* About Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-300">
                    <h2 className="font-semibold">About</h2>
                    <Info className="w-4 h-4" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{docInfo.about}</p>
                </div>

                {/* Fee */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Consultation Fee:</span>
                  <span className="text-purple-300 font-semibold">{currencySymbol}{docInfo.fees}</span>
                </div>
              </div>
            </div>

            {/* Booking Slots Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold text-white">Select Appointment Time</h2>
              
              {/* Date Selection */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {docSlots.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`flex flex-col items-center min-w-[100px] p-4 rounded-xl transition-all duration-300
                      ${slotIndex === index 
                        ? "bg-purple-500 text-white" 
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-purple-500/10"}`}
                  >
                    <span className="text-sm font-medium">{item[0] && daysofWeek[item[0].datetime.getDay()]}</span>
                    <span className="text-lg">{item[0] && item[0].datetime.getDate()}</span>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="flex flex-wrap gap-3">
                {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-6 py-2 rounded-lg transition-all duration-300
                      ${item.time === slotTime 
                        ? "bg-purple-500 text-white" 
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-purple-500/10"}`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Book Button */}
              <button
                onClick={bookAppointment}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-purple-500 hover:bg-purple-600 
                        text-white rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            </div>

            {/* Related Doctors Section */}
            <div className="mt-12">
              <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
      </div>
    </div>
  );
};

export default Appointment;