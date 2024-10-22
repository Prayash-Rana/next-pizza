import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Signup = () => {

  const router = useRouter();

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (credential.password === credential.confirmPassword) {
      console.log(credential);

      const response = await fetch("api/userSignup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
          address: credential.address
        })
      })

      const responseJson = await response.json();
      if (responseJson.success) {
        setSuccess(true);
        localStorage.setItem("token",responseJson.data.authtoken);
        localStorage.setItem("userEmail",responseJson.data.user.email);
        localStorage.setItem("isAdmin", responseJson.data.isAdmin);


        router.push("/")
      } else {
        setError(responseJson.message || "Registration failed");
        alert("something wrong")
      }
      
    } else {
      console.log("password not matched with confirm password");
    }
  };
  return (
    <div className="min-h-[75vh] flex items-center justify-center mb-0 py-2 ">
      <div className="bg-white dark:bg-gray-600 dark:text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form
          onSubmit={handleSubmit}
          className="dark:bg-gray-600 dark:text-white"
        >
          {/* username Input */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="name"
            >
              Username
            </label>
            <input
              name="name"
              type="text"
              value={credential.name}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email or Username
            </label>
            <input
              name="email"
              type="email"
              value={credential.email}
              onChange={handleChange}
              required
              placeholder="Enter your email or username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="password"
            >
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

          {/* confirm password  */}
          <div className="mb-6">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={credential.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* address */}
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              name="address"
              type="text"
              value={credential.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sign in Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* login Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          already have an account?{" "}
          <Link href={"/login"} className="text-indigo-600 hover:underline">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
