import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ---------- Left Side ---------- */}
                <div>
                    <div className='flex items-center gap-1'>
                        <img
                            onClick={() => navigate("/")}
                            className='w-14 cursor-pointer'
                            src={assets.logo}
                            alt="Appointify Logo"
                        />
                        <h1
                            onClick={() => navigate("/")}
                            className='text-2xl font-bold'
                        >
                            Appointify
                        </h1>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>"Your time is precious, and so is your health. Let us take care of both."</p>
                </div>

                {/* ---------- Center Side ---------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* ---------- Right Side ---------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-8057260114</li>
                        <li>shreynbd@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ---------- Copyright Text ---------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ Appointify - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer