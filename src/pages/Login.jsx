
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-[#1a1445] to-[#2a1d5d]">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="flex flex-col gap-4 items-start p-8 rounded-xl shadow-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="w-full text-center mb-4">
            <h1 className="text-2xl font-semibold text-white">
              {state === "Sign Up" ? "Create" : "Login to"}{" "}
              <span className="text-purple-400">Account</span>
            </h1>
            <p className="text-gray-300 mt-2">
              Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
            </p>
          </div>

          {/* Full Name */}
          {state === "Sign Up" && (
            <div className="w-full">
              <p className="mb-1 text-gray-200">Full Name</p>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
              />
            </div>
          )}

          {/* Email */}
          <div className="w-full">
            <p className="mb-1 text-gray-200">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <p className="mb-1 text-gray-200">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors duration-300 mt-4"
          >
            <div className="flex items-center justify-center gap-2">
              {loading && <Loader2 className="animate-spin" />}
              {state === "Sign Up" ? "Create Account" : "Login"}
            </div>
          </button>

          {/* Toggle Sign Up / Login */}
          <div className="w-full text-center mt-4">
            <p className="text-gray-300">
              {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
                className="ml-1 text-purple-400 hover:text-purple-300 focus:outline-none"
              >
                {state === "Sign Up" ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;