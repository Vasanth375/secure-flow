/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const [form, setForm] = useState([]);
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const resp = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "/",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Content-Length": 57,
        },
        body: JSON.stringify(form),
      });

      // if (!resp.ok) {
      //   throw new error(`Request failed with status ${resp.status}`);
      // }
      // console.log("signin");
      const data = await resp.json();
      if (data.status === 404 || data.status === 401) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto min-w-max">
      <div className="font-mono text-3xl text-center my-7">Sign in</div>
      <form action="" className="flex flex-col gap-4">
        <input
          id="username"
          placeholder="Username"
          className="justify-center p-2 rounded-r-md bg-slate-100"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="justify-center p-2 rounded-r-md bg-slate-100"
        ></input>
        <button
          type="submit"
          className="p-2 text-gray-100 uppercase bg-red-600 rounded-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        
        <Oauth></Oauth>
      </form>
      <div className="flex gap-2">
        <p>Already have an Account</p>
        <Link to={"/signup"}>
          <span className="text-cyan-700">signup</span>
        </Link>
      </div>
      <p className="mt-2 text-red-900">
        {error ? error.message || "Something Went Wrong!!" : ""}
      </p>
    </div>
  );
}
