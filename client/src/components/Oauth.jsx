/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase.js";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const handleSubmit = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch("/api/auth/google", {
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

      const data = await response.json();
      console.log(data);
      if (data.status === 500) {
        dispatch(signInFailure(data));
        return;
      }
      if (data.status === 200) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <button
      type="button"
      className="p-2 text-gray-100 uppercase bg-red-600 rounded-md hover:bg-red-800 hover:text-gray-50"
      onClick={handleSubmit}
    >
      {loading ? "Loading..." : "Continue with google"}
    </button>
  );
}
