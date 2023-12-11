import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setForm] = useState([]);
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const responce = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log("Sent");
        })
        .catch((e) => {
          console.log(e);
        });
      const data = await responce.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto min-w-max">
      <div className="font-mono text-3xl text-center my-7">Signup</div>
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
          className="p-2 text-gray-100 uppercase rounded-md bg-slate-800 hover:bg-slate-900"
          type="submit"
          onSubmit={handleSubmit}
        >
          Signup
        </button>
        <button className="p-2 text-gray-100 uppercase bg-red-600 rounded-md hover:bg-red-800">
          continue with google
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-cyan-700">signin</span>
        </Link>
      </div>
    </div>
  );
}
