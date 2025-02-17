
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import RemoveConfirmation from '../components/RemoveConfirm';


const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + ", " + dateArray[2];
  };

  const getUserAppointments = async () => {

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }

  }

  const handleConfirmDelete = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/remove-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }

  }

  const handleRemoveClick = (appointment) => {
    if(!appointment.cancelled && !appointment.isCompleted){
      return toast.error("Required to cancel the appointment first");
    }
    setSelectedAppointment(appointment);
    setShowRemoveModal(true);
  }



  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 shadow-md rounded-lg mt-10">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">My Appointments</h2>
      {appointments.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
        >
          {/* Cross button at top-right */}
           {<div className='w-full flex justify-end mb-2'>
            <button
              onClick={() => handleRemoveClick(item.appointment)} 
              className=" text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

           </div>}
           <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center'>
               <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <img
              src={item.appointment.docData.image}
              alt="Doctor"
              className="w-full h-96 sm:h-96 lg:h-56 object-cover rounded-lg shadow-md border border-gray-300"
            />
          </div>

          {/* Doctor Information */}
          <div className="w-full lg:w-2/4 mb-4 lg:mb-0 px-2 sm:px-4">
            <p className="text-lg lg:text-xl font-semibold text-gray-800">{item.appointment.docData.name}</p>
            <p className="text-gray-600 mb-1 sm:mb-2">{item.appointment.docData.speciality}</p>
            <p className="text-gray-500">Address:</p>
            <p className="text-gray-800">{item.appointment.docData.address.line1}</p>
            <p className="text-gray-800 mb-2 sm:mb-4">{item.appointment.docData.address.line2}</p>
            <p className="text-gray-800">
              <span className="font-semibold">Date & Time:</span> {slotDateFormate(item.appointment.slotDate)} | {item.appointment.slotTime}
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full lg:w-1/4 flex flex-col space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row">
            {!item.appointment.cancelled && !item.appointment.isCompleted &&
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md">
                Pay Online
              </button>}
            {!item.appointment.cancelled && !item.appointment.isCompleted &&
              <button onClick={() => cancelAppointment(item.appointment._id)} className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md">
                Cancel Appointment
              </button>}
            {item.appointment.cancelled && !item.appointment.isCompleted &&
              <button className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-lg cursor-not-allowed shadow-md">
                Appointment Cancelled
              </button>}
            {item.appointment.isCompleted &&
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg cursor-not-allowed shadow-md">
                Appointment Completed
              </button>}
          </div>
           </div>
        </div>
      ))}
      <RemoveConfirmation
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={()=>handleConfirmDelete(selectedAppointment?._id)}
        DeleteDataName={selectedAppointment?.docData.name}
      />
    </div>

    
  );
};

export default MyAppointments;

