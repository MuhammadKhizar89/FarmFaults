import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../svgs/Loader";
import { signupApiCall } from "../apis/auth.api";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date().toISOString().split("T")[0]);
  const [password, setPassword] = useState("");
  const [confirmPasswor, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordStatus, setPasswordStatus] = useState("weak");

  const checkPasswordStrength = (password) => {
    let strength = "weak";
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);
    const isLongEnough = password.length >= 8;

    // All conditions are met, so password is strong
    if (
      isLongEnough &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    ) {
      strength = "strong";
    }
    // Password meets some conditions but not all, so it is moderate
    else if (
      isLongEnough &&
      (hasUpperCase || hasLowerCase) &&
      (hasNumbers || hasSpecialChar)
    ) {
      strength = "moderate";
    }
    // Less than 8 characters or missing most conditions, so it's weak
    else {
      strength = "weak";
    }

    setPasswordStatus(strength);
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  async function signup(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordStatus !== "strong") {
      toast.error(
        "Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPasswor) {
      toast.error("Re-confirm Password");
      setLoading(false);
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      dob,
      password,
      remember: rememberMe,
    };

    const response = await signupApiCall(body);
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
      <Link to="/dashboard" className="heading-lg">
        Farm Faults
      </Link>
      <div className="w-[80%] bg-secondary authForm flex flex-col justify-start items-center pt-5 pb-16 px-2">
        <h1 className="heading text-center">Create account</h1>
        <form
          onSubmit={signup}
          className="flex flex-wrap gap-[30px] mt-10 max-w-[728px] justify-center"
        >
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="first-name" className="txt">
              First Name
            </label>
            <input
              minLength={3}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
          </div>
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="last-name" className="txt">
              Last Name
            </label>
            <input
              minLength={3}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
          </div>
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="email-phone" className="txt">
              Email
            </label>
            <input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
          </div>
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="dob" className="txt">
              Date of Birth
            </label>
            <input
              value={dob}
              required
              onChange={(e) => setDob(e.target.value)}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
          </div>
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="password" className="txt">
              Password
            </label>
            <input
              minLength={8}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
            <span className="txt mt-2">
              Password Strength:{" "}
              <span
                className={`${
                  passwordStatus === "weak"
                    ? "text-red-700"
                    : passwordStatus === "moderate"
                    ? "text-yellow-700"
                    : passwordStatus === "strong"
                    ? "text-green-700"
                    : ""
                }`}
              >
                {passwordStatus}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-[3.9px] w-full md:w-[349px]">
            <label htmlFor="confirm-password" className="txt">
              Confirm Password
            </label>
            <input
              required
              value={confirmPasswor}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="w-full bg-transparent border poppins border-tertiary rounded-[5px] p-2 focus:outline-none txt"
            />
          </div>
          <div className="w-full max-w-[349px] lg:max-w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="block bg-transparent"
                value={rememberMe}
                onChange={(e) => setRememberMe(Boolean(e.target.value))}
              />
              <label htmlFor="remember" className="txt">
                Remember me
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="privacy-policy"
                id="privacy-policy"
                className="block bg-transparent"
                required
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
              />
              <label htmlFor="privacy-policy" className="txt">
                I agree to all{" "}
                <Link to="/tos" className="hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          <div className="flex flex-col w-full mt-14 gap-5 items-center">
            <button
              type="submit"
              className="bg-tertiary w-full md:w-[349px] rounded-[5px] py-3 text-center txt font-semibold text-white"
            >
              {loading ? (
                <Loader color="#fff" className="w-[20px] h-[20px] mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
            <span className="txt">
              Don’t have an account? <Link to="/signin">Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}
