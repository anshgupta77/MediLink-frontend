import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    const logout = () => {
        navigate('/');
        setToken(false);
        localStorage.removeItem('token');
    }

    const handleAdminLogin = () => {
        window.open("https://doc-on-admin.vercel.app/", "_blank")
    }

    return (
        <div className='sticky top-0 z-50 bg-[#130e3d] border-b border-indigo-900'>
            <div className='max-w-7xl mx-auto flex items-center justify-between text-sm py-4 px-4 text-[#d3bccc]'>
                {/* Logo */}
                <div className='flex items-center gap-2 hover:opacity-90 transition-opacity'>
                    {/* <img
                        onClick={() => navigate("/")}
                        className='w-14 cursor-pointer'
                        src=""
                        alt="MediLink Logo"
                    /> */}
                    <h1
                        onClick={() => navigate("/")}
                        className='text-2xl font-bold cursor-pointer'
                    >
                        MediLink
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex items-center gap-8 font-medium'>
                    <NavLink to="/" className={({ isActive }) => 
                        `relative py-1 after:content-[""] after:absolute after:w-0 after:h-0.5 
                         after:bg-[#d3bccc] after:left-0 after:bottom-0 after:transition-all 
                         hover:after:w-full ${isActive ? 'after:w-full' : ''}`}>
                        <li>HOME</li>
                    </NavLink>
                    <NavLink to="/doctors" className={({ isActive }) => 
                        `relative py-1 after:content-[""] after:absolute after:w-0 after:h-0.5 
                         after:bg-[#d3bccc] after:left-0 after:bottom-0 after:transition-all 
                         hover:after:w-full ${isActive ? 'after:w-full' : ''}`}>
                        <li>ALL DOCTORS</li>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => 
                        `relative py-1 after:content-[""] after:absolute after:w-0 after:h-0.5 
                         after:bg-[#d3bccc] after:left-0 after:bottom-0 after:transition-all 
                         hover:after:w-full ${isActive ? 'after:w-full' : ''}`}>
                        <li>ABOUT</li>
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => 
                        `relative py-1 after:content-[""] after:absolute after:w-0 after:h-0.5 
                         after:bg-[#d3bccc] after:left-0 after:bottom-0 after:transition-all 
                         hover:after:w-full ${isActive ? 'after:w-full' : ''}`}>
                        <li>CONTACT</li>
                    </NavLink>
                    <button 
                        className='px-4 py-1.5 text-xs rounded-full border border-[#d3bccc] 
                                 text-[#d3bccc] hover:bg-[#d3bccc] hover:text-[#130e3d] 
                                 transition-colors' 
                        onClick={handleAdminLogin}
                    >
                        Admin login
                    </button>
                </ul>

                {/* User Profile/Login */}
                <div className='flex items-center gap-4'>
                    {(token && userData) ? (
                        <div className='relative'>
                            <div 
                                className='flex items-center gap-2 cursor-pointer p-2 rounded-full
                                         hover:bg-indigo-800/50 transition-colors'
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="" />
                                <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {showProfileMenu && (
                                <div className='absolute right-0 mt-2 w-48 py-2 bg-[#130e3d] rounded-lg shadow-xl border border-[#d3bccc]'>
                                    <div 
                                        onClick={() => {
                                                        navigate('/my-profile');
                                                        setShowProfileMenu(false);
                                                        }} 
                                        className='px-4 py-2 text-[#d3bccc] hover:bg-[#3c299b] cursor-pointer'
                                    >
                                        My Profile
                                    </div>
                                    <div 
                                        onClick={() => {navigate('/my-appointments');setShowProfileMenu(false);}} 
                                        className='px-4 py-2 text-[#d3bccc] hover:bg-[#3c299b] cursor-pointer'
                                    >
                                        My Appointments
                                    </div>
                                    <div 
                                        onClick={() =>{logout(); setShowProfileMenu(false);}} 
                                        className='px-4 py-2 text-red-500 hover:bg-[#3c299b] cursor-pointer'
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className={`px-6 py-2 rounded-full text-sm font-medium
                                    transition-colors ${path === "/login" 
                                    ? "bg-blue-800 hover:bg-blue-700" 
                                    : "bg-[#3828cc] hover:bg-[#4838dc]"}`}
                        >
                            Create Account
                        </button>
                    )}

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setShowMenu(true)} 
                        className='md:hidden p-2 hover:bg-indigo-800/50 rounded-full transition-colors'
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-[#130e3d] transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden z-50`}>
                    <div className='flex items-center justify-between p-4 border-b border-indigo-900'>
                        <div className='flex items-center gap-2'>
                            {/* <img className='w-14' src={assets.logo} alt="" /> */}
                            <span className='text-2xl font-bold'>MediLink</span>
                        </div>
                        <button 
                            onClick={() => setShowMenu(false)}
                            className='p-2 hover:bg-indigo-800/50 rounded-full transition-colors'
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className='p-4 space-y-4'>
                        <NavLink 
                            to="/" 
                            onClick={() => setShowMenu(false)}
                            className='block px-4 py-2 text-lg hover:bg-indigo-800/50 rounded-lg transition-colors'
                        >
                            HOME
                        </NavLink>
                        <NavLink 
                            to="/doctors" 
                            onClick={() => setShowMenu(false)}
                            className='block px-4 py-2 text-lg hover:bg-indigo-800/50 rounded-lg transition-colors'
                        >
                            ALL DOCTORS
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            onClick={() => setShowMenu(false)}
                            className='block px-4 py-2 text-lg hover:bg-indigo-800/50 rounded-lg transition-colors'
                        >
                            ABOUT
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            onClick={() => setShowMenu(false)}
                            className='block px-4 py-2 text-lg hover:bg-indigo-800/50 rounded-lg transition-colors'
                        >
                            CONTACT
                        </NavLink>
                        <button 
                            className='w-full px-4 py-2 text-lg text-center border border-[#d3bccc] 
                                     rounded-lg hover:bg-indigo-800/50 transition-colors' 
                            onClick={handleAdminLogin}
                        >
                            Admin login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar