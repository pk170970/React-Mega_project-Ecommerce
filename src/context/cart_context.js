import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = () => {

  if (localStorage.getItem("cart")) {
    const data = JSON.parse(localStorage.getItem("cart"));
    return data;
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 543
}


const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product, color } })
  }

  const clearCart = () => {
    dispatch({type:CLEAR_CART});
   }
  const removeItem = (id) => {
    dispatch({type:REMOVE_CART_ITEM,payload:id})
   }

  const toggleAmount = (id,value) => {
    // console.log(id,value);
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT,payload:{id,value}})
   }

  useEffect(() => {
    dispatch({type:COUNT_CART_TOTALS});
    localStorage.setItem("cart", JSON.stringify(state.cart)); // we are setting localstorage
  }, [state.cart])

  return (
    <CartContext.Provider value=
      {{ ...state, addToCart, clearCart, removeItem, toggleAmount }}
    >{children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
