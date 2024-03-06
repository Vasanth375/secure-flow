import "../App.css";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="my-6 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-6">
        <img
          src={currentUser.data.profilePic}
          alt="profile-pic"
          className="self-center object-cover w-24 h-24 mx-6 border-2 rounded-full cursor-pointer hover:border-y-stone-500"
        />
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
