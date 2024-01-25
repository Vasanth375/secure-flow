/* eslint-disable no-undef */
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase.js";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Oauth() {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="p-2 text-gray-100 uppercase bg-red-600 rounded-md hover:bg-red-800 hover:text-gray-50"
      onClick={handleSubmit}
    > 
      Continue with google
    </button>
  );
}
