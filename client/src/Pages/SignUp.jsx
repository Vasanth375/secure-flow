/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/User/userSlice";
export default function SignUp() {
  const [formData, setForm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const dispatch = useDispatch();
  const { load, error, currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signUpStart());
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Sent");
      console.log(load);
      const data = await response.json();
      if (data.status === 500) {
        dispatch(signUpFailure(data));
        return;
      }
      if (data.status == 200) {
        dispatch(signUpSuccess(data));
      }
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signUpFailure(error));
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto min-w-max">
      <div className="font-mono text-3xl text-center my-7">SignUp</div>
      <form className="flex flex-col gap-4">
        <input
          className="justify-center p-2 rounded-md bg-slate-100"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
        ></input>
        <input
          className="p-2 rounded-md bg-slate-100"
          placeholder="Email"
          type="email"
          id="email"
          onChange={handleChange}
          required
        ></input>
        <input
          className="p-2 rounded-md bg-slate-100"
          placeholder="Password"
          type="password"
          id="password"
          onChange={handleChange}
          required
        ></input>
        <button
          className="p-2 text-gray-100 uppercase bg-red-600 rounded-md hover:bg-red-800"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
      <div className="flex flex-col my-4">
        <Oauth></Oauth>
      </div>
      <div className="flex gap-2 text-slate-100">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-cyan-300 hover:text-white">signin</span>
        </Link>
      </div>
      <p className="mt-2 text-red-900">
        {currentUser ? currentUser.message || "Something Went Wrong!!" : ""}
      </p>
    </div>
  );
}
