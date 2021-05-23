import { useLocation } from 'react-router-dom';
import {useState, useContext} from 'react'
import CartContext from "../contexts/CartContext"
import Navbar from "../component/navbar/nav"
import CartTable from "../component/cart/CartTable"

function Cart(){

  const location = useLocation();
  return(
    <>
      <Navbar/>
      <div>
        <CartTable />
      </div>

    </>
  )
}
export default Cart;