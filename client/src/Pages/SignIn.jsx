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
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
    setStatus(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      // If any field is missing, display an error and return early
      // console.log("Please fill in all fields");
      setStatus(true);
      return;
    }
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
      if (data.status === 404 || data.status === 401 || data.status === 500) {
        dispatch(signInFailure(data));
        return;
      }
      if (data.status === 200) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      // console.log(loading, error);
      // navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto min-w-max">
      <div className="font-mono text-3xl text-center my-7 text-slate-900">
        SignIn
      </div>
      <form action="" className="flex flex-col gap-4 mb-4">
        <input
          id="username"
          placeholder="Username"
          className="justify-center p-2 rounded-r-md bg-slate-100"
          onChange={handleChange}
          required
        ></input>
        <input
          id="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="justify-center p-2 rounded-r-md bg-slate-100"
          required
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
      <div className="flex gap-2 text-slate-50">
        <p>Didn&apos;t have an Account</p>
        <Link to={"/signup"}>
          <span className="text-blue-700 underline hover:text-white">
            SignUp
          </span>
        </Link>
      </div>
      <p className="mt-2 text-red-900">
        {currentUser
          ? currentUser.messsage || "Something Went Wrong!!"
          : status
          ? "Something Went Wrong!!"
          : error.message || ""}
      </p>
    </div>
  );
}
