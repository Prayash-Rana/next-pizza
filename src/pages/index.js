import localFont from "next/font/local";

import React, { useState } from "react";
// import cardData from "@/components/store/cardData.json";
import CarouselHome from "@/components/home/CarouselHome";
import FoodCard from "@/components/home/Card";
import { baseURL } from "@/components/utils/baseURL";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const HomeCard = ({ data }) => {

  const foodData = []

  const handleData = () => {
    data?.map((data) => {
      return foodData.push(data)
    })
  }

  handleData()

  let categorySet = new Set(foodData.map((item) => item.category));


  let foodtypeSet = new Set(foodData.map((item) => item.foodType));

  let [foodType, setFoodType] = useState("All");
  let [foodIndex, setFoodIndex] = useState(0);

  const foodtypeArray = ["All", ...foodtypeSet];

  const CategoryUniqueArray = [...categorySet];

  console.log(foodtypeArray);
  console.log(foodType);

  console.log(foodIndex);

  console.log(`${baseURL}api/foodData`);

  console.log(data);

 



  // console.log(CategoryUniqueArray)
  return (
    <>
    <Head>
      <title>PizzzaWizza</title>
    </Head>
      <CarouselHome />

     

      <div className="flex space-x-5 my-4 px-4">
        {foodtypeArray.map((item, index) => (
          <p
            key={index}
            onClick={() => {
              setFoodType(item);
              setFoodIndex(index);
            }}
            className={`text-2xl px-4 rounded-lg py-2 font-bold cursor-pointer ${
              index === foodIndex
                ? "bg-gray-500 text-white"
                : "bg-pink-300 text-violet-500"
            }`}
          >
            {item}
          </p>
        ))}
      </div>

      <div>
        {foodIndex != 0
          ? CategoryUniqueArray.map((item) => {
              return (
                <div key={item} className="px-4 py-2">
                  <h2 className="text-2xl font-bold text-red-500">{item}</h2>
                  <hr className="border-2 border-green-500" />

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
                    {foodData
                      .filter(
                        (data) =>
                          data.category === item && data.foodType === foodType
                      )
                      .map((filtereditem) => (
                        <FoodCard
                          key={filtereditem._id}
                          id={filtereditem._id}
                          name={filtereditem.name}
                          description={filtereditem.description}
                          image={filtereditem.img}
                          price={filtereditem.price}
                        />
                      ))}
                  </div>
                </div>
              );
            })
          : CategoryUniqueArray.map((item) => {
              return (
                <div key={item} className="px-4 py-2">
                  <h2 className="text-2xl font-bold text-red-500">{item}</h2>
                  <hr className="border-2 border-green-500" />

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
                    {foodData
                      .filter((data) => data.category === item)
                      .map((filtereditem) => (
                        <FoodCard
                          key={filtereditem._id}
                          id={filtereditem._id}
                          name={filtereditem.name}
                          description={filtereditem.description}
                          image={filtereditem.img}
                          price={filtereditem.price}
                        />
                      ))}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default HomeCard;

// Fetch data using getStaticProps for Next.js
export async function getStaticProps() {
  let dataPizza = null; // Initialize with a fallback structure


  try {
    const response = await fetch(`${baseURL}api/foodData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    dataPizza = await response.json();
  } catch (error) {
    console.error("Error fetching food data:", error.message);
  }

  return {
    props: {
      data: dataPizza?.data || [],
    },
  };
}
