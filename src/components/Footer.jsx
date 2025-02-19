// import React from 'react'
// import { assets } from '../assets/assets_frontend/assets'

// const Footer = () => {
//     return (
//         <div className='md:mx-10'>
//             <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
//                 {/* ---------- Left Side ---------- */}
//                 <div>
//                     <div className='flex items-center gap-1'>
//                         <img
//                             onClick={() => navigate("/")}
//                             className='w-14 cursor-pointer'
//                             src={assets.logo}
//                             alt="MediLink Logo"
//                         />
//                         <h1
//                             onClick={() => navigate("/")}
//                             className='text-2xl font-bold'
//                         >
//                             MediLink
//                         </h1>
//                     </div>
//                     <p className='w-full md:w-2/3 text-gray-600 leading-6'>"Your time is precious, and so is your health. Let us take care of both."</p>
//                 </div>

//                 {/* ---------- Center Side ---------- */}
//                 <div>
//                     <p className='text-xl font-medium mb-5'>COMPANY</p>
//                     <ul className='flex flex-col gap-2 text-gray-600'>
//                         <li>Home</li>
//                         <li>About us</li>
//                         <li>Contact us</li>
//                         <li>Privacy Policy</li>
//                     </ul>
//                 </div>

//                 {/* ---------- Right Side ---------- */}
//                 <div>
//                     <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//                     <ul className='flex flex-col gap-2 text-gray-600'>
//                         <li>+91-9105220998</li>
//                         <li>kumarguptaansh0@gmail.com</li>
//                     </ul>
//                 </div>
//             </div>

//             {/* ---------- Copyright Text ---------- */}
//             <div>
//                 <hr />
//                 <p className='py-5 text-sm text-center'>Copyright 2024@ MediLink - All Right Reserved.</p>
//             </div>
//         </div>
//     )
// }

// export default Footer



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { Phone, Mail, ArrowUpRight, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#1a1445] text-[#e5d7f5]">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"/>
            
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
                            {/* <img
                                className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
                                src={assets.logo}
                                alt="MediLink Logo"
                            /> */}
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                                MediLink
                            </h1>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            "Your time is precious, and so is your health. Let us take care of both."
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, index) => (
                                <button key={index} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <Icon size={18} className="text-gray-400 hover:text-purple-400 transition-colors"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Company</h2>
                        <ul className="space-y-2">
                            {['Home', 'About us', 'Contact us', 'Privacy Policy'].map((item, index) => (
                                <li key={index}>
                                    <button className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                        {item}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Get in Touch</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="tel:+91-9105220998" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Phone size={16}/>
                                    +91-9105220998
                                </a>
                            </li>
                            <li>
                                <a href="mailto:kumarguptaansh0@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Mail size={16}/>
                                    kumarguptaansh0@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Newsletter</h2>
                        <p className="text-gray-400">Stay updated with our latest news and updates.</p>
                        <div className="flex flex-col gap-3">
                            <button className="px-4 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <p>© {currentYear} MediLink. All rights reserved.</p>
                        <div className="flex gap-6">
                            <button className="hover:text-white transition-colors">Terms</button>
                            <button className="hover:text-white transition-colors">Privacy</button>
                            <button className="hover:text-white transition-colors">Cookies</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;