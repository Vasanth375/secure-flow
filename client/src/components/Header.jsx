import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <div className="header">
      <div className="flex items-center justify-between p-3.5 mx-auto max-w-5xl gap-2">
        <Link id="logohome" to="/">
          <h1 className="font-semibold text-slate-900">MERN App</h1>
        </Link>
        <ul className="flex gap-8 font-mono text-slate-800">
          <Link id="home" to={"/"}>
            <li>Home</li>
          </Link>
          <Link id="profile" to={"/profile"}>
            {currentUser ? (
              <div className="flex gap-8">
                <img
                  src={currentUser.data.profilePic}
                  alt="profile-pic"
                  className="object-cover rounded-full h-7 w-7"
                ></img>
                <Link id="out" to={"/"}>
                  <li>Sign Out</li>
                </Link>
              </div>
            ) : (
              <div className="flex gap-8">
                <Link to={"/signin"}>
                  <li>Sign In</li>
                </Link>
                <Link to={"/signup"}>
                  <li>Sign Up</li>
                </Link>
              </div>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
