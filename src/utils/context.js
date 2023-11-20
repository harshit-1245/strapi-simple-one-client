import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useLocation } from 'react-router-dom';

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation(); //it helps to stars at top
  
  useEffect(()=>{
    //very good 
    window.scrollTo(0,0)
  },[location])
  useEffect(()=>{
    let count=0;
    cartItems.map((item)=>(count +=item.attributes.quantity));
    setCartCount(count);


    //subtotal functionality
     let subTotal=0;
     cartItems.map(item=>subTotal += item.attributes.price * item.attributes.quantity);
     setCartSubTotal(subTotal);
  },[cartItems]);
  

   //basically this helps to add to cart button to add in cart 
   const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (index !== -1) {
        items[index].attributes.quantity += quantity;
    } else {
        product.attributes.quantity = quantity;
        items = [...items, product];
    }
   
    setCartItems(items);
};

const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
};
  const handleCartProductQuantity=(type,product)=>{
    let items=[...cartItems];
     let index=items.findIndex((p)=>p.id===product.id);
     if(type ==='inc'){
      items[index].attributes.quantity +=1;
     }else if(type==='dec'){
      //if already at one
       if(items[index].attributes.quantity===1) return;
        items[index].attributes.quantity -=1;
     }
     //you need to update after condition
     setCartItems(items);
  }

  return (
    <Context.Provider value={{
      products,
      setProducts,
      categories,
      setCategories,
      cartItems,
      setCartItems,
      handleAddToCart,
      cartCount,
      handleRemoveFromCart,
      showCart,
      setShowCart,
      handleCartProductQuantity,
      cartSubTotal,
      
    }}>
      {children}
    </Context.Provider>
  );
}
