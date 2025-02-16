import { createContext, useEffect, useState } from "react";
// import { doctors } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl)

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);
    const [speciality, setSpeciality] = useState(false);


    const getDoctorsData = async () => {
        const url = speciality 
            ? `${backendUrl}/api/doctor/list?speciality=${speciality}`
            : `${backendUrl}/api/doctor/list`;

        console.log("Speciality", speciality);
        try {
            const { data } = await axios.get(url);
            if (data.success) {
                console.log(data);
                setDoctors(data.doctors)
                console.log(doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async () => {

        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }

    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        speciality,setSpeciality
    }

    useEffect(() => {
        getDoctorsData();
    }, [speciality])

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider