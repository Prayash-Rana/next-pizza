import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("api/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const responseJson = await response.json();

    if (responseJson.success) {
      
      localStorage.setItem("token", responseJson.data.authtoken);
      localStorage.setItem("userEmail", responseJson.data.user.email);
      localStorage.setItem("isAdmin", responseJson.data.isAdmin);


      router.push("/");
    } else {
      
      alert("something wrong");
    }
  };
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-300 mb-0 ">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold dark:text-pink-500 text-center mb-6">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="dark:bg-gray-800 dark:text-white"
        >
          {/* Email or Username Input */}
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="email">
              Email or Username
            </label>
            <input
              name="email"
              type="email"
              value={credential.email}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={credential.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm ">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign-up Link */}
        <p className="mt-4 text-sm text-center">
          <span className="dark:text-white mx-4">Don't have an account?</span>

          <Link href={"/signup"} className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
