/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signout,
} from "../redux/User/userSlice.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase.js";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setForm] = useState({});
  const [updateSuccess, setUpdateSucc] = useState(false);
  const { loading, currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log(formData);
  // console.log(currentUser);
  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(currentUser);
      dispatch(signInStart());
      const res = await fetch(`/api/user/update/${currentUser.data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === 200) {
        // console.log("data updated");
        dispatch(signInSuccess(data));
        setUpdateSucc(true);
        return;
      }
      if (data.status === 500) {
        // console.log("Failed");
        dispatch(signInFailure(data));
        return;
      }
    } catch (error) {
      // console.log("error");
      dispatch(signInFailure(error));
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteStart());
      const result = await fetch(`/api/user/delete/${currentUser.data._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (data.status === 200) {
        dispatch(deleteSuccess());
        return;
      }
      if (data.status === 500) {
        // console.log("Failed");
        dispatch(deleteFailure(data));
        return;
      }
    } catch (error) {
      dispatch(deleteFailure(error));
    }
  };

  const handleSignout = async (e) => {
    try {
      const result = await fetch("/api/auth/signout", {
        method: "GET",
      });
      // console.log(result);
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setForm({ ...formData, profilePicture: downloadURL });
          setImageError(false);
          // console.log(downloadURL);
        });
      }
    );
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="my-6 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-6">
        <input
          type="file"
          name="changeprofile"
          id="change"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          hidden
        />
        <img
          src={formData.profilePicture || currentUser.data.profilePic}
          alt="profile-pic"
          onClick={() => fileRef.current.click()}
          className="self-center object-cover w-24 h-24 mx-6 border-2 rounded-full cursor-pointer hover:border-y-stone-500"
        />
        <p className="self-center text-sm">
          {imageError ? (
            <span className="text-red-500">
              Error Image Uploading(Image size should be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-red-700">{`Uploading Image ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-red-500">Upload Completed</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="username"
          id="uname"
          placeholder={currentUser.data.username}
          onChange={(e) => {
            setForm({ ...formData, username: e.target.value });
            // console.log(e.target.value);
          }}
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={currentUser.data.email}
          onChange={(e) => {
            setForm({ ...formData, email: e.target.value });
            // console.log(e.target.value);
          }}
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="password"
          onChange={(e) => {
            setForm({ ...formData, password: e.target.value });
            // console.log(e.target.value);
          }}
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <button
          className="self-center p-3 text-white uppercase rounded-xl w-72 bg-slate-700 hover:bg-slate-800"
          onClick={handleSubmit}
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <p className="self-center text-red-600">
          {error && "Something Went Wrong!!"}
        </p>
        <p className="self-center text-red-200">
          {updateSuccess && "Successfully Updated"}
        </p>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="p-1 border-2 rounded-md cursor-pointer text-slate-200 hover:text-black hover:border-0"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span
          className="p-1 border-2 rounded-md cursor-pointer text-slate-200 hover:text-black hover:border-0"
          onClick={handleSignout}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}
