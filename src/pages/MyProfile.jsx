import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

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
    }
  };

  return userData && (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg mt-10 hover:shadow-3xl transition-shadow duration-500 transform">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-8">
          {/* Profile Image */}
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative">
                <img src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" className="w-28 h-28 rounded border-4 border-gray-300 shadow-xl hover:shadow-2xl transition duration-500" />
                <img src={assets.upload_icon} alt="Upload Icon" className="absolute top-0 right-0 w-8 h-8 bg-blue-500 p-1 rounded shadow-md transform translate-x-2 -translate-y-2" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img src={userData.image} alt="Profile" className="w-28 h-28 rounded border-4 border-gray-400 shadow-xl hover:shadow-2xl transition duration-500" />
          )}

          {isEdit ? (
            <input
              value={userData.name}
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="text-4xl font-bold border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500 ease-in-out"
            />
          ) : (
            <p className="text-4xl font-bold text-gray-900 hover:text-blue-500 transition duration-300">{userData.name}</p>
          )}
        </div>
        <div>
          {isEdit ? (
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-gradient-to-l transform transition duration-500 hover:scale-110 focus:outline-none" onClick={updateUserProfileData}>
              Save Information
            </button>
          ) : (
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-xl hover:bg-gradient-to-l transform transition duration-500 hover:scale-110 focus:outline-none" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500 mb-8">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Email */}
          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium text-gray-900 hover:text-blue-500 transition duration-300">{userData.email}</p>
          </div>
          {/* Phone */}
          <div>
            <p className="text-gray-500">Phone Number</p>
            {isEdit ? (
              <input
                value={userData.phone}
                type="text"
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500"
              />
            ) : (
              <p className="font-medium text-gray-900 hover:text-blue-500 transition duration-300">{userData.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500 mb-8">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Address Information</h2>
        {isEdit ? (
          <div className="grid grid-cols-1 gap-4">
            <input
              value={userData.address.line1}
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500"
              placeholder="Address Line 1"
            />
            <input
              value={userData.address.line2}
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500"
              placeholder="Address Line 2"
            />
          </div>
        ) : (
          <p className="text-gray-900 font-medium">
            {userData.address.line1}<br />
            {userData.address.line2}
          </p>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Gender */}
          <div>
            <p className="text-gray-500">Gender</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="font-medium text-gray-900 hover:text-blue-500 transition duration-300">{userData.gender}</p>
            )}
          </div>
          {/* Date of Birth */}
          <div>
            <p className="text-gray-500">Birthday</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-500"
              />
            ) : (
              <p className="font-medium text-gray-900 hover:text-blue-500 transition duration-300">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
