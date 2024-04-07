/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/User/userSlice";
export default function SignUp() {
  const [formData, setForm] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [status, setStatus] = useState(false);

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
    setStatus(false);
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      // If any field is missing, display an error and return early
      // console.log("Please fill in all fields");
      setStatus(true);
      return;
    }
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
      // console.log(load);
      const data = await response.json();
      if (data.status === 500 || data.status === 404 || data.status === 401) {
        dispatch(signUpFailure(data));
        return;
      }
      if (data.status == 200) {
        dispatch(signUpSuccess(data));
        navigate("/");
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
      <form action="" className="flex flex-col gap-4">
        <input
          className="justify-center p-2 rounded-md bg-slate-100"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          aria-required
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
        <p>Already have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700 underline hover:text-white">
            SignIn
          </span>
        </Link>
      </div>
      <p className="mt-2 text-red-900">
        {currentUser
          ? currentUser.message || "Something Went Wrong!!"
          : status
          ? "Something Went Wrong!!"
          : ""}
      </p>
    </div>
  );
}
