import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        }
        else {
          toast.error(data.message);
        }
      }
      else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        console.log(data)
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
        else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl text-gray-600 text-sm shadow-lg bg-white'>
        <p className='text-2x font-semibold'>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className='text-gray-500'>
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>

        {/* Full Name */}
        {state === "Sign Up" && (
          <div className='w-full'>
            <p className='mb-1'>Full Name</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* Email */}
        <div className='w-full'>
          <p className='mb-1'>Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className='w-full'>
          <p className='mb-1'>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle Sign Up / Login */}
        <div className="w-full text-center mt-4">
          <p className="text-gray-500 text-sm">
            {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
              className="ml-1 text-blue-600 hover:underline focus:outline-none"
            >
              {state === "Sign Up" ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </form>

  )
}

export default Login