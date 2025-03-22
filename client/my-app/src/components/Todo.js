import React from "react";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

export default function Todo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-zinc-300 h-120 w-150 flex flex-col items-center">
      <div className="w-full font-mono pl-2 text-lg">Welcome, User</div>
      <h1 className="text-3xl font-mono mt-3">TODO</h1>

      <form className="flex flex-col w-full h-20 items-center mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
        <input className="w-[70%] bg-white h-10 rounded-l-md ml-5 pl-5 outline-none" placeholder="New Task" {...register("task", {required: {value: true, message: "This field is required"}})} />
        <input className="w-[20%] bg-lime-300 rounded-r-md h-10 hover:bg-lime-400 duration-500" type="submit" />
        </div>
        {errors.task && <span className="text-red-500">{errors.task.message}</span>}
      </form>

      <div className="bg-zinc-100 w-full h-90">
        <div className="bg-red-100 w-full h-10 flex items-center justify-between pl-5 pr-5 text-lg">
          <h6 className="bg-blue-500 w-[90%]">Do the dishes</h6>
          <button className="display-">
            <i class="fa-solid fa-trash text-red-500"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
