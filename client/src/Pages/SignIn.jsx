import React, { useState } from "react";

export default function SignIn() {
  // console.log("Signin");
  const [form, setForm] = useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.36.0",
          Accept: "/",
          "Postman-Token": "cd6922da-29a0-4347-ad24-fe8ce581d678",

          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Content-Length": 57,
        },
        body: JSON.stringify(form),
      });

      if (!resp.ok) {
        throw new Error(`Request failed with status ${resp.status}`);
      }
      console.log("signin");
      const data = resp.json ? await resp.json() : null;
      console.log(data);
    } catch (error) {
      console.log(error);
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
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
