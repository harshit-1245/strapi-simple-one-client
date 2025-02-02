
import React, { useContext, useState } from "react"
import {TbSearch} from "react-icons/tb"
import {CgShoppingCart} from "react-icons/cg"
import {AiOutlineHeart} from "react-icons/ai" //this all are icons
import { useNavigate } from "react-router-dom";

import "./Header.scss"
import { useEffect } from "react"
import Cart from "../Cart/Cart";
import Search from "./Search/Search"
import { Context } from "../../utils/context";



function Header() {
  const [scrolled,setScrolled] =useState(false);
  const [showCart,setShowCart]=useState(false);
  const [showSearch,setShowSearch]=useState(false);
  const {cartCount}=useContext(Context);
  const navigate=useNavigate();


  const handleScroll =()=>{
    const offset=window.scrollY
    if(offset>200){
      setScrolled(true)
    }else{
      setScrolled(false);
    }
    
  };
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
  })

  
  return (
    <>
    <header className={`main-header ${scrolled?'sticky-header':''}`}>
      <div className='header-content'>
        <ul className='left'>
          <li onClick={()=>navigate("/")}>Home</li>
        <li>About</li>
        <li>Catgories</li>
        </ul>
        <div className='center' onClick={()=>navigate("/")}>HarryStore</div>
        <div className='right'>
          <TbSearch onClick={()=>setShowSearch(true)}/>
          <AiOutlineHeart/>
          <span className='cart-icon'><CgShoppingCart onClick={()=>setShowCart(true)}/>
        {/* if it is zero then it will disappear */}
         { !!cartCount && <span>{cartCount}</span>}
          </span>
        </div>
      </div>
    </header>
    {/* giving onlcick when show cat will true it will appear cat item */}
    {/* we passing setShowCart as a prop so we change state */}
    {showCart && <Cart setShowCart={setShowCart}/>}
    {/* pure logic */}
    {showSearch && <Search setShowSearch={setShowSearch}/>}
    </>
    
  )
}

export default Header
