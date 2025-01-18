import React from 'react'
import Layout from '../components/layout/Layout'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { register,reset } from '../features/auth/authSlice'
// import Spinner from '../components/Spinner'


const Register = () => {
   const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    address:'',
    phone:'',
    role:'user',
    image:''
   })

   const {name,email,password,address,phone,role,image}=formData
   const navigate=useNavigate()
   const dispatch=useDispatch()

   const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
   
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess||user){
      navigate('/')
    }

    dispatch(reset())
  },[user,isError,isLoading,isSuccess,message,navigate,dispatch])
   
const onChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
}



const handleSubmit=async(e)=>{
  e.preventDefault();
  const userData={
    name,
    email,
    password,
    phone,
    address,
    role,
    image
}
  dispatch(register(userData))
  navigate('/');
  };

  // if(isLoading){
  //   return <Spinner/>
  // }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center mt-16 px-6 py-12 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       {/* <img
         alt="Your Company"
         src={merge}
         className="mx-auto h-16 w-auto"
       /> */}
       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create New Account
       </h2>
     </div>

     <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
       <form onSubmit={handleSubmit} className="space-y-6">
         <div>
           <label className="block text-sm/6 font-medium text-gray-900">
             Email address
           </label>
           <div className="mt-1">
             <input
               id="email"
               name="email"
               type="email"
               value={email}
               onChange={onChange}
               required
               autoComplete="email"
               className=" w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <label  className="block text-sm/6 font-medium text-gray-900">
             Name
           </label>
           <div className="mt-1">
             <input
               id="name"
               name="name"
               type="text"
               value={name}
               onChange={onChange}
               required
               className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
             Phone
           </label>
           <div className="mt-2">
             <input
               id="phone"
               name="phone"
               type="text"
               value={phone}
               onChange={onChange}
               
               className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
             Address
           </label>
           <div className="mt-2">
             <input
               id="address"
               name="address"
               type="text"
               value={address}
               onChange={onChange}
               
              
               className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
               Password
             </label>
             
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
               className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             />
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             Sign Up
           </button>
         </div> 
       </form>
 

     </div>
   </div>
</> 
)
}

export default Register