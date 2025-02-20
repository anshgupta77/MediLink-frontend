
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, CreditCard, Ban, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import RemoveConfirmation from '../components/RemoveConfirm';
import LoadingOverlay from '../components/LoadingOverlay';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [loadingGetUserAppointments, setLoadingGetUserAppointments] = useState(false);
  const [loadingCancelAppointment, setLoadingCancelAppointment] = useState(false);
  const [loadingRemoveAppointment, setLoadingRemoveAppointment] = useState(false);

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + ", " + dateArray[2];
  };

  const getUserAppointments = async () => {
    setLoadingGetUserAppointments(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoadingGetUserAppointments(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setLoadingCancelAppointment(true);
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
    } finally {
      setLoadingCancelAppointment(false);
    }
  };

  const handleConfirmDelete = async (appointmentId) => {
    setLoadingRemoveAppointment(true);
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
    } finally {
      setLoadingRemoveAppointment(false);
      setShowRemoveModal(false);
    }
  };

  const handleRemoveClick = (appointment) => {
    if(!appointment.cancelled && !appointment.isCompleted){
      return toast.error("Required to cancel the appointment first");
    }
    setSelectedAppointment(appointment);
    setShowRemoveModal(true);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  if(loadingGetUserAppointments || loadingCancelAppointment || loadingRemoveAppointment){
    return (
      <LoadingOverlay />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#a8299d] mb-8">My Appointments</h2>
        
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-2xl mb-6 overflow-hidden transition-all duration-300 hover:bg-white/10  "
          >
            <div className="p-6">
              {/* Remove button */}
              <div className="w-full flex justify-end mb-2">
                <button
                  onClick={() => handleRemoveClick(item.appointment)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Doctor Image */}
                <div className="w-full lg:w-1/4">
                  <img
                    src={item.appointment.docData.image}
                    alt="Doctor"
                    className="w-full h-56 object-cover rounded-lg shadow-lg border border-white/20"
                  />
                </div>

                {/* Doctor Information */}
                <div className="w-full lg:w-2/4 space-y-3">
                  <h3 className="text-xl font-semibold text-[#d3bccc]">
                    {item.appointment.docData.name}
                  </h3>
                  <p className="text-purple-300">{item.appointment.docData.speciality}</p>
                  
                  <div className="space-y-1">
                    <p className="text-gray-400">Address:</p>
                    <p className="text-gray-300">{item.appointment.docData.address.line1}</p>
                    <p className="text-gray-300">{item.appointment.docData.address.line2}</p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-gray-300">
                      <span className="text-purple-300 font-semibold">Date & Time:</span>{' '}
                      {slotDateFormate(item.appointment.slotDate)} | {item.appointment.slotTime}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full lg:w-1/4 flex flex-col gap-3">
                  {!item.appointment.cancelled && !item.appointment.isCompleted && (
                    <>
                      <button className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg">
                        <CreditCard className="w-5 h-5" />
                        Pay Online
                      </button>
                      <button 
                        onClick={() => cancelAppointment(item.appointment._id)}
                        className="w-full bg-[#ec48e1] text-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Ban className="w-5 h-5" /> 
                        Cancel
                      </button>
                    </>
                  )}
                  
                  {item.appointment.cancelled && !item.appointment.isCompleted && (
                    <button className="w-full bg-gray-600/50 text-gray-300 py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                      <Ban className="w-5 h-5" />
                      Cancelled
                    </button>
                  )}
                  
                  {item.appointment.isCompleted && (
                    <button className="w-full bg-[#5a23a1] text-white py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RemoveConfirmation
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={() => handleConfirmDelete(selectedAppointment?._id)}
        DeleteDataName={selectedAppointment?.docData.name}
      />
    </div>
  );
};

export default MyAppointments;
