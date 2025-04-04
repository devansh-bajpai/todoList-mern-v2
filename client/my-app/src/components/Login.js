import React from "react";
import {useState, useEffect} from "react"

import {BrowserRouter as Router, Link, useNavigate} from "react-router-dom"

import { useForm } from "react-hook-form";


export default function Login() {

  const navigate = useNavigate()

  useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:5000/authCheck", {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
          });
          const data = await response.json()
          console.log(data.authCheck)
          if (data.authCheck){
              navigate("/todo")
          }
        }
        catch(err) {
          console.log(err)
        }
      }
      checkAuth()
    }, []
  
  );


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({})

  const onSubmit = async (data) => {

    await fetch("http://localhost:5000/authenticate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    }).then(
      res => res.json()
    ).then(
      (data) => {
        setData(data);
        if (data.isAuthenticated === true){
          navigate("/todo")
        }
      }
    )



  }

  return (
    <div className="bg-zinc-300 h-120 w-150 flex flex-col items-center">
      <h1 className="text-3xl font-mono mt-3">Login</h1>

      <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

      <input type="email" className="m-4 bg-white pl-2 rounded-sm w-80 h-8 outline-none" placeholder="Email" {...register("email", {required: {value: true, message: "This Field is Required."}})} />

      {errors.email && <span className="text-red-500 mb-2">{errors.email.message}</span>}

      <input type="password" className="m-2 mt-0 bg-white pl-2 rounded-sm w-80 h-8 outline-none" placeholder="Password" {...register("password", { required: {value: true, message: "This Field is Required."}, minLength: {value: 8, message: "Password must be atleast 8 characters long."}})} />
    
      {errors.password && <span className="text-red-500">{errors.password.message}</span>}

      <input className="m-2 w-20 bg-lime-200 pl-2 rounded-sm h-10 w-20 font-mono text-lg hover:bg-lime-300 duration-500" type="submit" />
    </form>

      
      <h6 className="text-lg text-slate-600">New User? <Link className="text-blue-600 underline" to={"/signup"}>Signup</Link></h6>
      

      <h5>
            {(data) && (<span className="text-red-500">{data.message}</span>)}
          </h5>

    </div>
  );
}

