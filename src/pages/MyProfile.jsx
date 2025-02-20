

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Camera, Save, Pencil, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token }
      });
      
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return userData && (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1445] to-[#2a1d5d] py-12 px-4 ">
      <div className="max-w-4xl mx-auto sm:mb-[7%]">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-purple-500/20 h-48 relative">
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-purple-400/30 overflow-hidden bg-white/10">
                  <img 
                    src={image ? URL.createObjectURL(image) : userData.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  {isEdit && (
                    <label htmlFor="image" className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                      <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-24 px-8 pb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-white">My Profile</h2>
              <button 
                onClick={() => isEdit ? updateUserProfileData() : setIsEdit(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-300"
                style={{ backgroundColor: isEdit ? 'rgb(147, 51, 234)' : 'rgb(139, 92, 246)' }}
              >
                <div className="flex items-center gap-2">
                  {loading && <Loader2 className="animate-spin" />}
                  {isEdit ? (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Pencil className="w-5 h-5" />
                      Edit Profile
                    </>
                  )}
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                {isEdit ? (
                  <input 
                    type="text" 
                    value={userData.name} 
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                ) : (
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.email}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                {isEdit ? (
                  <input 
                    type="text" 
                    value={userData.phone} 
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                ) : (
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.phone}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Address</label>
                {isEdit ? (
                  <input 
                    type="text" 
                    value={userData.address.line1} 
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                ) : (
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.address.line1}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Gender</label>
                {isEdit ? (
                  <select 
                    value={userData.gender} 
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  >
                    <option value="Not Selected" className='bg-purple-700 text-white hover:bg-purple-800'>Not Selected</option>
                    <option value="Male" className='bg-purple-700 text-white hover:bg-purple-800'>Male</option>
                    <option value="Female" className='bg-purple-700 text-white hover:bg-purple-800'>Female</option>
                  </select>
                ) : (
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.gender}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Birthday</label>
                {isEdit ? (
                  <input 
                    type="date" 
                    value={userData.dob} 
                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                  />
                ) : (
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">{userData.dob}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;



