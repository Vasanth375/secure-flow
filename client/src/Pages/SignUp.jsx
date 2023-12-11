import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="max-w-lg p-3 mx-auto min-w-max">
      <div className="font-mono text-3xl text-center my-7">Signup</div>
      <form className="flex flex-col gap-4">
        <input
          className="justify-center p-2 rounded-md bg-slate-100"
          placeholder="Username"
        ></input>
        <input
          className="p-2 rounded-md bg-slate-100"
          placeholder="Email"
          type="email"
        ></input>
        <input
          className="p-2 rounded-md bg-slate-100"
          placeholder="Password"
          type="password"
        ></input>
        <button
          className="p-2 text-gray-100 uppercase rounded-md bg-slate-800 hover:bg-slate-900"
          type="submit"
        >
          Signup
        </button>
        <button className="p-2 text-gray-100 uppercase bg-red-600 rounded-md hover:bg-red-800">
          continue with google
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to={"/signup"}>
          <span className="text-cyan-700">signin</span>
        </Link>
      </div>
    </div>
  );
}
