import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="flex items-center justify-between p-3.5 mx-auto max-w-5xl gap-2">
        <Link to={"/"}>
          <h1 className="font-semibold text-slate-900">MERN App</h1>
        </Link>
        <ul className="flex gap-8 font-mono text-slate-800">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/signin"}>
            <li>Sign In</li>
          </Link>
          <Link to={"/signup"}>
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
