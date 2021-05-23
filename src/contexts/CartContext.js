import {useState, createContext} from "react"


export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cart, setCart] = useState({items: [], open: false})
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
