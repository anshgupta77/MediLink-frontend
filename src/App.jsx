import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'
import { ToastContainer} from 'react-toastify';
import socket from './socket'
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/Chat'

const App = () => {
  const {loading1, userData} = useContext(AppContext);
  if(loading1){
    return (
      console.log("Loading"),
      <LoadingOverlay/>
    )
  }
  return (
    <div className='bg-[#130e3d] text-[#d3bccc]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:specialityData' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointments/:docId' element={<Appointment />} />
        <Route path='/chat' element={<Chat userId={userData._id}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App