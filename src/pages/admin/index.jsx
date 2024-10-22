import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const pizzaPriceOptions = { regular: "", medium: "", large: "" };
const beveragePriceOptions = { single: "", double: "" };



const Admin = () => {
  const router = useRouter() ;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin);
  }, []);

  const [foodData, setFoodData] = useState({
    name: "",
    category: "",
    foodType: "",
    price: {},
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "category") {
      if (value === "Pizza") {
        setFoodData((prevData) => ({
          ...prevData,

          price: pizzaPriceOptions,
        }));
      } else if (value === "SIDES & BEVERAGES") {
        setFoodData((prevData) => ({
          ...prevData,

          price: beveragePriceOptions,
        }));
      } else {
        setFoodData((prevData) => ({
          ...prevData,

          price: 0,
        }));
      }
    }
  };

  // Handles changes for dynamic price fields
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      price: {
        ...prevData.price,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(" Admin Food Data Submitted:", foodData);

    const response = await fetch("/api/createAdminFoodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: foodData.name,
        category: foodData.category,
        foodType: foodData.foodType,
        price: foodData.price,
        description: foodData.description,
        img: foodData.img,
      }),
    });

    const responseJson = await response.json();
      if (responseJson.success) {
      
        alert("created food data successfully")
        router.push("/")
        setFoodData({
          name: "",
          category: "",
          foodType: "",
          price: "",
          description: "",
          img: ""
        });
      } else {
          alert("something wrong")
      }
  };
  if (!isAdmin) {
    return <div>This page is only for admin users.</div>;
  }

  return (
    
      <div className="min-h-[75vh] flex items-center justify-center mb-0 py-2 ">
      <div className="bg-white dark:bg-gray-600 dark:text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Food Data</h2>

        <form
          onSubmit={handleSubmit}
          className="dark:bg-gray-600 dark:text-white"
        >
          {/* Food Name */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Food Name
            </label>
            <input
              name="name"
              type="text"
              value={foodData.name}
              onChange={handleChange}
              placeholder="Enter your food name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="category">
              Food Category
            </label>
            <select
              name="category"
              value={foodData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select an Option</option>
              <option value="Pizza">Pizza</option>
              <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
            </select>
          </div>

          {/* Food Type Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="foodType">
              Food Type
            </label>
            <select
              name="foodType"
              value={foodData.foodType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Food Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Food Price Input */}
          <div className="mb-6">
            {foodData.category !== "" && (
              <label className="block text-sm font-bold mb-2" htmlFor="price">
                Food Price
              </label>
            )}

            {foodData.category !== "" &&
              Object.keys(foodData.price).map((key) => (
                <div key={key} className="ml-4 mb-4">
                  <label htmlFor={key} className="block mb-1">
                    {key.toLocaleUpperCase()}
                  </label>
                  <input
                    type="number"
                    name={key}
                    placeholder={`Price of ${key}`}
                    value={foodData.price[key]}
                    onChange={handlePriceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
          </div>

          {/* Food Description */}
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>

            <textarea
              rows={2}
              name="description"
              type="text"
              value={foodData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Food Image */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="img">
              Image
            </label>

            <input
              name="img"
              type="url"
              value={foodData.img}
              onChange={handleChange}
              placeholder="Enter image url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  
    
   
  );
};

export default Admin;
