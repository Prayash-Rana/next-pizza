import { baseURL } from "@/components/utils/baseURL";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Item = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Back Link */}
      <Link href="/" className="text-blue-500 hover:underline text-lg mb-5">
        ← Back to Home
      </Link>

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Image Section */}
        <div className="relative w-full h-32 mb-5">
          <Image
            src={data.img}
            alt={data.name}
            layout="fill" // Fill the parent container
            objectFit="cover" // Maintain aspect ratio while covering the container
            className="rounded-lg"
          />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h2>
          <p className="text-gray-600 text-lg mb-4">{data.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default Item;

export async function getServerSideProps(context) {
  const { item } = context.query;
  let data = {};

  
  try {
    const response = await fetch(`${baseURL}api/getDataById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: item }),
    });

    const repo = await response.json();
    data = repo.data || {};
    
  } catch (error) {
    console.error("Error fetching item data:", error);
  }

  return {
    props: {
      data,
  }
}
}
