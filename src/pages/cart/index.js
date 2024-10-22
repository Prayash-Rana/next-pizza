import { CartContext } from "@/components/utils/contextNewReducer";
import { useRouter } from "next/router";

import React, { useContext, useState } from "react";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const router = useRouter();

  const calculateTotal = () => {
    return state.reduce((total, item) => total + item.price, 0);
  };

  if (state.length === 0) {
    return (
      <p className="py-4 max-w-lg border-2 bg-gray-400 mx-auto text-center text-3xl my-5">
        Your cart is empty.
      </p>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");

    const response = await fetch("/api/ordersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        items_details: state,
        order_date: new Date().toDateString(),
      }),
    });

    const responseJson = await response.json();

    if (responseJson.success) {
      dispatch({
        type: "DROP",
      });

      router.push("/");
      alert("order placed");
    } else {
      alert("something wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Serial
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Image
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Quantity
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>

              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.size}</td>
              <td className="border-0 border-gray-300 px-4 py-2 flex justify-center mt-5 space-x-5">
                <button
                  className="px-2 bg-green-300"
                  onClick={() =>
                    dispatch({
                      type: "INCREMENT",
                      tempId: item.tempId,
                      unitprice: item.price / item.qty,
                    })
                  }
                >
                  +
                </button>

                <p>{item.qty}</p>
                <button
                  className="px-2 bg-green-300"
                  onClick={() => {
                    if (item.qty > 1) {
                      dispatch({
                        type: "DECREMENT",
                        tempId: item.tempId,
                        unitprice: item.price / item.qty,
                      });
                    }
                    if (item.qty <= 1) {
                      dispatch({ type: "REMOVE", index: index });
                    }
                  }}
                >
                  -
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${item.price.toFixed(2)}
              </td>

              <td
                className="border border-gray-300 px-4 py-2"
                onClick={() => dispatch({ type: "REMOVE", index: index })}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="1" className="text-right font-bold px-4 py-2">
              Total:
            </td>
            <td className=" px-4 py-2">${calculateTotal().toFixed(2)}</td>
            <button
              onClick={handleCheckout}
              className="py-2 bg-green-400 px-4 my-2 rounded-lg"
            >
              Check Out
            </button>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
