import { createContext, useEffect, useState } from "react";
// import { doctors } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from "../constraint";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$";
    console.log(backendUrl)

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);
    const [speciality, setSpeciality] = useState(false);
    const [search, setSearch] = useState("");
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(false);


    const getDoctorsData = async () => {
        
        try {
            let url = `${backendUrl}/api/doctor/list`;

            if (speciality || search !== "") {
                url += `?${speciality ? `speciality=${speciality}&` : ""}${search !== "" ? `search=${search}` : ""}`;
            }
            const { data } = await axios.get(url);
            console.log(data , "Speciality", speciality)
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });
            console.log(data)
            setUserData(data.userData);

        } catch (error) {
            console.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading1(false);
        }

    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        speciality,setSpeciality,
        setSearch, search,
        loading1, setLoading1,
        loading2, setLoading2
    }

    useEffect(() => {
        getDoctorsData();
    }, [speciality, search])

    useEffect(() => {
        setLoading1(true)
        loadUserProfileData();
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider