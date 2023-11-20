import React, { useContext, useState } from 'react'
import prod from "../../assets/category/download-1.jpeg"
import {FaCartPlus, FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa"
import RelatedProducts from './RelatedProducts/RelatedProducts'
import './SingleProduct.scss';
import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';
import { Context } from '../../utils/context';

function SingleProduct() {
  
  const [quantity,setQuantity]=useState(1);
  const {id} =useParams(); //basicalli id works as a key used in app.js :id
 // you can use direct value to see what params 
 const {handleAddToCart}=useContext(Context);
 const {data} =useFetch(`/api/products?populate=*&[filters][id]=${id}`);
 if(!data) return;
 const product=data?.data[0]?.attributes; //all main property is here

 const increment=()=>{
  setQuantity((prevState)=>prevState+1);
 }
 const decrement=()=>{
  //it will stuck at one
  setQuantity((prevState)=>{
    if(prevState===1){
      return 1;
    }else{
      return prevState-1;
    }
  });
 }
 
  return (
   <div className="single-product-main-content">
    <div className="layout">
      <div className="single-product-page">
        <div className="left">
          <img src={
            process.env.REACT_APP_STRIPE_APP_DEV_URL +
            product?.img?.data[0]?.attributes?.url
          } alt="" />
        </div>
        <div className="right">
          {/* we using api here */}
          <span className="name">{product.title}</span>
          <span className="price">&#8377;{product.price}</span>
          <span className="desc">{product.desc}</span>

        <div className="cart-buttons">
          <div className="quantity-buttons">
            <span onClick={decrement}>-</span>
            <span>{quantity}</span>
            <span onClick={increment}>+</span>
          </div>
          {/* data.data[0] is the product */}
          <button className='add-to-cart-button'
          onClick={()=>{
            handleAddToCart(data.data[0],quantity);
            //after adding into cart it set to 1 again
            setQuantity(1);
          }} >
            <FaCartPlus size={20} />
           ADD TO CART

          </button>
        </div>
          <span className='divider' />
          <div className="info-item">
            <span className="text-bold">
              Category:{product?.categories?.data[0]?.attributes?.title}
               <br />
            
            <span className='social-icons'>
              <FaFacebook size={16}/>
              <FaTwitter size={16}/>
              <FaInstagram size={16}/>
              <FaLinkedin size={16}/>
              
            </span>
            </span>
          </div>

        </div>
      </div>
      <RelatedProducts productID={id} categoryId={product?.categories?.data[0]?.id}/>
    </div>
   </div>
  )
}

export default SingleProduct
