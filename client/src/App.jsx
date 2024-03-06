import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./components/Header";
import "../src/App.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
