import google from "../assets/google.png";
import apple from "../assets/apple.png";
import Planica from "../assets/Planica.svg";
import Login from "../assets/Login.png";
import LoginPage from "../assets/LoginPage.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(data: any) {
    try {
      const response = await axios.post(
        "http://localhost:3000/manager/login",
        data
      );
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        console.log("Token saved to localStorage");
        navigate("/");
      } else {
        console.error("Token not found in the response");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center relative bg-[rgb(225,207,251)]">
        <div className=" top-5 left-5 fixed mx-8">
          <div className="  flex items-center justify-start mt-8 pb-2">
            <img src={Planica} alt="planica icon" />
          </div>
        </div>
        <div className="top-14 right-5 fixed mx-8">
          <span className="p-4 text-bold">Sign Up</span>
          <span className="p-4 rounded-2xl bg-[#6B10EA] text-white px-8">
            Request Demo
          </span>
        </div>

        <div className="absolute right-36 ">
          <img src={LoginPage} alt="" />
        </div>

        <div className="bg-white absolute shadow-lg rounded-2xl p-8 w-[400px] h-[500px] max-w-md">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            Manager Login
          </h2>
          <p className="text-lg text-gray-600 text-center mb-6">
            Hey, Enter your details to get sign in to your account
          </p>
          <form>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Email / Phone No
              </label>
              <input
                type="text"
                id="email"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                placeholder="Enter your email or phone"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="text-right text-sm mb-2">
              <a href="#" className="text-purple-500 hover:underline">
                Having trouble in sign in?
              </a>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                login({ email, password });
              }}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
          <div className="mt-3 flex items-center justify-center">
            <span className="text-sm text-gray-500">Or Sign in with</span>
          </div>
          <div className="mt-2 flex gap-4 justify-center">
            <button className="flex items-center p-2  border border-gray-300 rounded-md shadow-sm text-xs hover:bg-gray-100">
              <img src={google} alt="Google" className="px-2" /> Login with
              Google
            </button>
            <button className="flex items-center p-2 border border-gray-300 rounded-md text-xs shadow-sm hover:bg-gray-100">
              <img src={apple} alt="Apple" className="px-2" /> Login with Apple
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="#" className="text-purple-500 hover:underline">
                Request Now
              </a>
            </p>
          </div>
        </div>
        <div className="absolute left-36 bottom-20">
          <img src={Login} alt="" />
        </div>
      </div>
    </>
  );
}

export default SignIn;
