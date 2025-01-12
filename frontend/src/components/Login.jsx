import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
// import Spinner from '../components/Spinner'
import {jwtDecode} from 'jwt-decode';




const Login = () => {

  const [formData,setFormData]=useState({
    email:'',
    password:'',
    role:'user'
    
   })
  
   const {email,password,role}=formData

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
  
  const onChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
}
  useEffect(()=>{
    // if(isError){
    //   toast.error(message)
    // }
    if(isSuccess||user){
      navigate('/')
    }

    dispatch(reset())
  },[user,isError,isLoading,isSuccess,message,navigate,dispatch])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      email,
      password,
      role
    };
  
    try {
      const response = await dispatch(login(userData)).unwrap(); 
      if (response.success) {
        navigate('/'); 
      }
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    }
    console.log(userData);
  };



// if (isLoading) {
//   return <Spinner />;
// }
  return (
    <>
       <div className="flex min-h-full flex-1 flex-col justify-center mt-16 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="AMS"
            src={merge}
            className="mx-auto h-16 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div >
            <button className='flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
            onClick={()=>{navigate('/admin-login')}} type='button'>Admin Login</button>
          </div>
          

        </div>
      </div>
      </>
  )
}

export default Login