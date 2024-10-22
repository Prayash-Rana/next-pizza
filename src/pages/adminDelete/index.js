import { baseURL } from "@/components/utils/baseURL";
import React, { useEffect, useState } from "react";

const AdminDelete = ({ data }) => {
  const [pizzaData, setPizzaData] = useState(data);// State to manage pizzas

  const [isAdmin,setIsAdmin] = useState(false); 

  useEffect(()=> {
    const admin = localStorage.getItem("isAdmin");

    if(admin){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  },[])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteAdminData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send pizza ID in the request body
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Filter out the deleted pizza from the state
      setPizzaData(pizzaData.filter((item) => item._id !== id));

      alert("Pizza deleted successfully!");
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting pizza:", error);
      alert("Failed to delete pizza.");
    }
  };

  if (!pizzaData || pizzaData.length === 0) {
    return <p>No pizza data available.</p>;
  }
  if (!isAdmin) {
    return <div>This page is only for admin users.</div>;
  }
  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Serial</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Food Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzaData.map((item, index) => (
            <tr key={item._id} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
              <td className="border border-gray-300 px-4 py-2">{item.foodType}</td>
              <td className="border border-gray-300 px-4 py-2">
                {Object.entries(item.price).map(([size, value]) => (
                  <p key={size}>{`${size}: $${value}`}</p>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDelete;

export async function getServerSideProps() {
  let data = [];

  try {
    const response = await fetch(`${baseURL}api/getAdminData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const repo = await response.json();
    console.log("Fetched Data:", repo.data); // Check fetched data here
    data = repo.data || [];
  } catch (error) {
    console.error("Error fetching item data:", error);
  }

  return {
    props: { data },
  };
}
