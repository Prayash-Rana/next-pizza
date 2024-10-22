import { createContext, useMemo, useReducer } from "react";

export const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          tempId: action.tempId,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.priceOption,
          image: action.image,
        },
      ];

    case "UPDATE":
      let arr = [...state];
      arr.find((item, index) => {
        if (item.tempId === action.tempId) {
          arr[index] = {
            ...item,
            qty: parseInt(item.qty) + parseInt(action.qty),
            price: parseInt(item.price) + parseInt(action.price),
          };
        }
      });
      return arr;

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);

      return newArr;

    case "INCREMENT":
      let incArr = [...state];

      incArr.find((item, index) => {
        if (item.tempId === action.tempId) {
          incArr[index] = {
            ...item,
            qty: item.qty + 1,
            price: item.price + action.unitprice,
          };
        }
      });

      return incArr;

    case "DECREMENT":
      let deArr = [...state];

      deArr.find((item, index) => {
        if (item.tempId === action.tempId) {
          deArr[index] = {
            ...item,
            qty: item.qty - 1,
            price: item.price - action.unitprice,
          };
        }
      });

      return deArr;

    case "DROP":
      let emptyArr = [] ;
      return emptyArr;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
