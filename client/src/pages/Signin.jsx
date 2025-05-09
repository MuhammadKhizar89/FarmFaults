import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Email from "../svgs/auth/Email";
import Password from "../svgs/auth/Password";
import { signinApiCall } from "../apis/auth.api";
import Loader from "../svgs/Loader";
import toast from "react-hot-toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signin(e) {
    e.preventDefault();
    setLoading(true);
    if (email === "") {
      toast.error("Please enter email.");
      setLoading(false);
      return;
    }
    if (password === "") {
      toast.error("Please enter password.");
      setLoading(false);
      return;
    }
    const body = { email, password };
    const response = await signinApiCall(body);
    if (response.success) {
      toast.success(response.message);
      navigate("/dashboard");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }
  return (
    <main className="flex items-center justify-center flex-col gap-5 bg-primary py-10">
      <Link to="/dashboard" className="heading-lg">Farm Faults</Link>
      <div className="w-[80%] bg-secondary authForm flex flex-col justify-start items-center pt-5 pb-16 px-2">
        <h1 className="heading text-center">Login in Your account</h1>
        <form
          onSubmit={signin}
          className="flex flex-wrap gap-[30px] mt-10 max-w-[728px] justify-center"
        >
          <div className="flex flex-col gap-[3.9px] md:w-[544px]">
            <label htmlFor="email" className="txt">
              Email Id:
            </label>
            <div className="flex w-full bg-transparent border border-tertiary rounded-[5px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@provistechnologies.com"
                className="focus:outline-none bg-transparent poppins w-full h-full py-2 px-4"
                disabled={loading}
              />
              <div className="bg-tertiary h-full p-2 rounded-[5px]">
                <Email />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[3.9px] md:w-[544px]">
            <label htmlFor="email" className="txt">
              Password
            </label>
            <div className="flex w-full bg-transparent border border-tertiary rounded-[5px]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter you password"
                className="focus:outline-none bg-transparent poppins w-full h-full py-2 px-4"
                disabled={loading}
              />
              <div className="bg-tertiary h-full p-2 rounded-[5px]">
                <Password />
              </div>
            </div>
            <p className="w-full text-end txt cursor-pointer hover:underline mt-1">
              Forget password?
            </p>
          </div>
          <div className="flex flex-col mt-10 gap-5 items-center w-full md:w-[550px]">
            <button
              disabled={loading}
              className="bg-tertiary loginBtnShadow w-full md:w-[544px] rounded-[5px] py-3 text-center txt-lg text-white"
            >
              {loading ? (
                <Loader color="#fff" className="w-[28px] h-[28px] mx-auto" />
              ) : (
                "Login now"
              )}
            </button>
            <div className="w-full flex justify-between items-center">
              <div className="w-[40%] h-[1px] bg-tertiary" />
              <span className="txt">OR</span>
              <div className="w-[40%] h-[1px] bg-tertiary" />
            </div>
            <Link
              to="/signup"
              className="bg-tertiary loginBtnShadow w-full md:w-[349px] rounded-[5px] py-3 text-center txt font-semibold text-white"
            >
              Create account
            </Link>
            <span className="txt">
              Don't have an account? <Link to="/signup">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}
