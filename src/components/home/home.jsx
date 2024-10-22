import React, { useState,useEffect} from "react";
import CarouselHome from "./CarouselHome";
import cardData from "../store/cardData.json";
import FoodCard from "./Card";
import { baseURL } from "../utils/baseURL";

// const HomeCard = (props) => {

//   const { data } = props; // Destructure data from props

//   // Log props.data to see the received data
//   console.log("Props Data:", props.data);


//   let categorySet = new Set(cardData.map((item) => item.category));

//   let foodtypeSet = new Set(cardData.map((item) => item.foodType));

//   let [foodType, setFoodType] = useState("All");
//   let [foodIndex, setFoodIndex] = useState(0);

//   const foodtypeArray = ["All", ...foodtypeSet];

//   const CategoryUniqueArray = [...categorySet];

//   console.log(foodtypeArray);
//   console.log(foodType);

//   console.log(foodIndex);

 


//   console.log(process.env.NODE_ENV)

//   // console.log(CategoryUniqueArray)
//   return (
//     <div>
//       <CarouselHome />

//       <div className="flex space-x-5 my-4 px-4">
//         {foodtypeArray.map((item, index) => (
//           <p
//             key={index}
//             onClick={() => {
//               setFoodType(item);
//               setFoodIndex(index);
//             }}
//             className={`text-2xl px-4 rounded-lg py-2 font-bold cursor-pointer ${
//               index === foodIndex
//                 ? "bg-gray-500 text-white"
//                 : "bg-pink-300 text-violet-500"
//             }`}
//           >
//             {item}
//           </p>
//         ))}
//       </div>

//       <div>
//         {foodIndex != 0
//           ? CategoryUniqueArray.map((item) => {
//               return (
//                 <div key={item} className="px-4 py-2">
//                   <h2 className="text-2xl font-bold text-red-500">{item}</h2>
//                   <hr className="border-2 border-green-500" />

//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
//                     {cardData
//                       .filter(
//                         (data) =>
//                           data.category === item && data.foodType === foodType
//                       )
//                       .map((filtereditem) => (
//                         <FoodCard
//                           key={filtereditem.id}
//                           id={filtereditem.id}
//                           name={filtereditem.name}
//                           description={filtereditem.description}
//                           image={filtereditem.img}
//                           price={filtereditem.price}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               );
//             })
//           : CategoryUniqueArray.map((item) => {
//               return (
//                 <div key={item} className="px-4 py-2">
//                   <h2 className="text-2xl font-bold text-red-500">{item}</h2>
//                   <hr className="border-2 border-green-500" />

//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
//                     {cardData
//                       .filter((data) => data.category === item)
//                       .map((filtereditem) => (
//                         <FoodCard
//                           key={filtereditem.id}
//                           id={filtereditem.id}
//                           name={filtereditem.name}
//                           description={filtereditem.description}
//                           image={filtereditem.img}
//                           price={filtereditem.price}
//                         />
//                       ))}
//                   </div>
//                 </div>
//               );
//             })}
//       </div>
//     </div>
//   );
// };






// Fetch data using getStaticProps for Next.js



// export async function getStaticProps() {
//   const testData = [
//     { id: 1, name: "Test Pizza", category: "Pizza", foodType: "Veg", price: 10.99, description: "Delicious test pizza", img: "/images/pizza.png" },
//   ];

//   return {
//     props: {
//       data: testData, // Use test data
//     },
//   };
// }



// const HomeCard = ({ data }) => {
//   console.log("Data received in component:", data);

//   return (
//     <div>
//       {data? (
//         <div>Data Loaded Successfully</div>
//       ) : (
//         <div>No Data Available</div>
//       )}
//     </div>
//   );
// };

// export default HomeCard;
// import React, { useState } from "react";
// import CarouselHome from "./CarouselHome";
// import cardData from "../store/cardData.json";
// import FoodCard from "./Card";

// const HomeCard = () => {
//   let categorySet = new Set(cardData.map((item) => item.category));

//   let foodtypeSet = new Set(cardData.map((item) => item.foodType));

//   let [foodType,setFoodType] =  useState("All")

//   const foodtypeArray = [...foodtypeSet,"All"];

//   const CategoryUniqueArray = [...categorySet];

//   console.log(foodType)

//   console.log(CategoryUniqueArray)
//   return (
//     <div>
//       <CarouselHome />

//       <div className="flex space-x-5 my-4 px-4">
//         {foodtypeArray.map((item,) => {
//           return (<p onClick={()=> setFoodType(item)} className="text-2xl text-violet-500 px-4 rounded-lg py-2 font-bold bg-pink-300">{item}</p>)
//         })}
//       </div>

//       <div>
//         {(foodType === "Veg")? CategoryUniqueArray.map((item) => {
//           return (
//             <div key={item} className="px-4 py-2">
//               <h2 className="text-2xl font-bold text-red-500">{item}</h2>
//               <hr className="border-2 border-green-500"/>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
//                 {cardData
//                   .filter((data) => data.category === item && data.foodType === foodType)
//                   .map((filtereditem) => (
//                     <FoodCard
//                       key={filtereditem.id}
//                       id = {filtereditem.id}
//                       name={filtereditem.name}
//                       description={filtereditem.description}
//                       image={filtereditem.img}
//                       price ={filtereditem.price}
//                     />
//                   ))}
//               </div>
//             </div>
//           );
//         }) : (foodType === "Non-Veg")? CategoryUniqueArray.map((item) => {
//           return (
//             <div key={item} className="px-4 py-2">
//               <h2 className="text-2xl font-bold text-red-500">{item}</h2>
//               <hr className="border-2 border-green-500"/>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
//                 {cardData
//                   .filter((data) => data.category === item && data.foodType === foodType)
//                   .map((filtereditem) => (
//                     <FoodCard
//                       key={filtereditem.id}
//                       id = {filtereditem.id}
//                       name={filtereditem.name}
//                       description={filtereditem.description}
//                       image={filtereditem.img}
//                       price ={filtereditem.price}
//                     />
//                   ))}
//               </div>
//             </div>
//           );
//         }): CategoryUniqueArray.map((item) => {
//           return (
//             <div key={item} className="px-4 py-2">
//               <h2 className="text-2xl font-bold text-red-500">{item}</h2>
//               <hr className="border-2 border-green-500"/>

//               <div className="mt-4 grid grid-cols-1 md:grid-cols-3 justify-items-center bg-green-400">
//                 {cardData
//                   .filter((data) => data.category === item)
//                   .map((filtereditem) => (
//                     <FoodCard
//                       key={filtereditem.id}
//                       id = {filtereditem.id}
//                       name={filtereditem.name}
//                       description={filtereditem.description}
//                       image={filtereditem.img}
//                       price ={filtereditem.price}
//                     />
//                   ))}
//               </div>
//             </div>
//           );
//         })  }

//       </div>
//     </div>
//   );
// };

// export default HomeCard;
