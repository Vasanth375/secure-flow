/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase.js";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setForm] = useState({});
  // console.log(formData);
  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

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
          console.log(downloadURL);
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
          src={currentUser.data.profilePic}
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
          placeholder="Username"
          value={currentUser.data.username}
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={currentUser.data.email}
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="password"
          className="self-center p-2 border-2 w-72 rounded-xl bg-slate-200 hover:border-slate-500"
        />
        <button className="self-center p-3 text-white uppercase rounded-xl w-72 bg-slate-700 hover:bg-slate-800">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="p-1 border-2 rounded-md cursor-pointer text-slate-200 hover:text-black hover:border-0">
          Delete Account
        </span>
        <span className="p-1 border-2 rounded-md cursor-pointer text-slate-200 hover:text-black hover:border-0">
          Sign Out
        </span>
      </div>
    </div>
  );
}
