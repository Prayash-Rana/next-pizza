import React, { useState, useEffect } from "react";

const OrdersList = () => {
  const [ordersData, setOrdersData] = useState([]);

  const fetchData = async () => {
    try {
      // Retrieve the user email from local storage
      const userEmail = localStorage.getItem("userEmail");

      // Fetch order data from the API
      const response = await fetch("/api/myOrdersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const responseJson = await response.json();

      if (!responseJson) {
        console.log("No response JSON");
      } else {
        // Assuming the response contains 'order_data' with a nested array
        setOrdersData(responseJson.order_data.order_data);
        console.log("Orders data set successfully");
      }
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  console.log("ordersData", ordersData);

  return (
    <div>
      <h1>Orders List</h1>

      <div>
        {ordersData.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          <div>
            {ordersData.map((order, index) => {
              return (
                <div key={order._id}>
                  <h2 className="text-green-500 font-bold text-3xl">
                    {order.order_date}
                  </h2>

                  <div className="flex space-x-10 justify-center">
                    {order.items.map((item, index) => {
                      return (
                        <div key={item.id} className="mb-4 flex flex-col justify-between px-4 py-2 border-2 ">
                          <img src={item.image} alt="" width={200} className="h-[75%]"/>

                          <div >
                            <p>Price :{item.price}</p>
                            <p> Qty :{item.qty}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
