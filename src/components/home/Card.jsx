import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../utils/contextNewReducer";
import Link from "next/link";

let numberArray = [1, 2, 3, 4, 5];

const FoodCard = ({ id, image, name, description, price }) => {
  const priceOptions = Object.entries(price);

  const [qty, setQty] = useState(1);
  const [value, setValue] = useState(0);
  const [size, setSize] = useState("");

  // Calculate the total output
  const output = qty * value;

  const { state, dispatch } = useContext(CartContext);

  const handleAddtoCart = async () => {
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const updateItem = await state.find((item) => item.tempId === id + size);

    if (!updateItem) {
      dispatch({
        type: "ADD",
        id: id,
        tempId: id + size,
        name,
        price: output,
        qty,
        priceOption: size,
        image,
      });
    }

    if (updateItem) {
      dispatch({
        type: "UPDATE",

        tempId: id + size,

        price: output,
        qty,
      });
    }
  };

  // href={`/item/${id}`} as={`/pizza/${id}`}
  return (
    <div className="max-w-xs flex flex-col my-4  rounded overflow-hidden shadow-lg bg-gray-400">
      <Link href={{ pathname: "/item/[item].jsx" }} as={`/item/${id}`}>
        <Image
          src={image}
          alt={`Image of ${name}`}
          width={400}
          height={400}
          objectFit="cover"
        />

        {/* Content */}
        <div className="px-6 py-4 bg-gray-400 text-white">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base h-20">
            {description.split(" ").slice(0, 10).join(" ")}
            {description.split(" ").length > 10 && " ..."}
          </p>
        </div>

        
      </Link>

      {/* Options */}
      <div className="px-6 py-2 bg-gray-400 flex justify-between">
          <div>
            <select
              name="quantity"
              id="quantity"
              className="px-2 rounded-lg py-1"
              onChange={(e) => setQty(Number(e.target.value))} // Convert value to number
            >
              {numberArray.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              name="price"
              id="price"
              className="px-2 rounded-lg py-1"
              onChange={(e) => {
                setValue(Number(e.target.value)); // Set the price value
                setSize(
                  e.target.options[e.target.selectedIndex].text
                    .split(":")[0]
                    .trim()
                ); // Set the size (extract the size text before the colon)
              }}
            >
              <option value="">Select Size</option>
              {priceOptions.map(([size, value]) => (
                <option key={size} value={value}>
                  {size} : {value}
                </option>
              ))}
            </select>
          </div>
        </div>

      {/* Button and Amount */}
      <div className="px-6 pt-4 bg-gray-400 flex justify-between items-center">
        <button
          onClick={handleAddtoCart}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>

        <div>
          <p>Amount</p>
          <p>{value ? output : "Select a size"}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
