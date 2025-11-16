import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ---------- GOOGLE LOGIN ----------
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        toast.error("Google login failed");
        return;
      }

      const decoded = jwtDecode(credentialResponse.credential);
      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub
      };

      const res = await axios.post(backendUrl + "/api/user/google-login", googleUser);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        toast.error(res.data.message || "Google login failed");
      }

    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google authentication error");
    }
  };
  // ----------------------------------

  useEffect(() => {
    if (token) navigate('/')
  }, [token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

      {/* HEADER */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-semibold' style={{ fontFamily: "Poppins" }}>
          {currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* INPUTS */}
      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800 rounded'
          placeholder='Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800 rounded'
        placeholder='Email'
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800 rounded'
        placeholder='Password'
        required
      />

      {/* SWITCH TEXT */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      {/* SUBMIT BUTTON */}
      <button
        className='bg-black text-white font-medium px-8 py-3 w-full rounded-lg 
                   hover:bg-gray-900 active:scale-95 transition-all duration-200 shadow-md mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {/* SEPARATOR */}
      <div className='flex items-center justify-center w-full my-4'>
        <div className='h-[1px] bg-gray-300 w-1/3'></div>
        <p className='px-2 text-gray-500 text-sm'>or</p>
        <div className='h-[1px] bg-gray-300 w-1/3'></div>
      </div>

      {/* GOOGLE BUTTON (original, clean, no hacks) */}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Google login failed")}
        theme="outline"
        size="large"
        width="330"
      />

    </form>
  )
}

export default Login
