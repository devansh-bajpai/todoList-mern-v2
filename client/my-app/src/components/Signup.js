import React from "react";
import { useForm } from "react-hook-form";

import {BrowserRouter as Router, Link} from "react-router-dom"

export default function Signup() {
 const { register, handleSubmit, watch, formState: { errors } } = useForm();


 
 const onSubmit = async (data) => {
  // console.log(data);
  await fetch("http://localhost:5000/save/user",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword
  })
    }

  )
}





  return (
    <div className="bg-zinc-300 h-120 w-150 flex flex-col items-center">
      <h1 className="text-3xl font-mono mt-3">Signup</h1>

      <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

      <input className="m-4 bg-white pl-2 rounded-sm w-80 h-8 outline-none mb-0" placeholder="Name" {...register("name", {required: {value: true, message: "This Field is Required"}, maxLength: {value: 20, message: "It is too long"}})} />

      <input type="email" className="m-4 bg-white pl-2 rounded-sm w-80 h-8 outline-none" placeholder="Email" {...register("email", {required: {value: true, message: "This Field is Required."}})} />

      {errors.email && <span className="text-red-500 mb-2">{errors.email.message}</span>}

      <input type="password" className="m-2 mt-0 bg-white pl-2 rounded-sm w-80 h-8 outline-none" placeholder="Password" {...register("password", { required: {value: true, message: "This Field is Required."}, minLength: {value: 8, message: "Password must be atleast 8 characters long."}})} />

      {errors.password && <span className="text-red-500">{errors.password.message}</span>}


      <input type="password" className="m-2 mt-0 bg-white pl-2 rounded-sm w-80 h-8 outline-none" placeholder="Confirm Password" {...register("confirmpassword", { required: {value: true, message: "This Field is Required."}, minLength: {value: 8, message: "Password must be atleast 8 characters long."}})} />


      <input className="m-2 w-20 bg-lime-200 pl-2 rounded-sm h-10 w-20 font-mono text-lg hover:bg-lime-300 duration-500" type="submit" />

      </form>

      <h6 className="text-lg text-slate-600">Already a user? <Link className="text-blue-600 underline" to={"/login"}>Login</Link></h6>
    </div>
  );
}
