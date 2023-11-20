import React, { useContext, useEffect } from 'react'

import "./Home.scss"
import Banner from "./Banner/Banner";
import Category from './Category/Category';
import Products from '../Products/Products';
import { fetchDataFromApi } from '../../utils/api';
import { Context } from '../../utils/context';


function Home() {
  const {categories,setCategories,products,setProducts}=useContext(Context);
  // You can easily access here categories as you pass in value of Context provider
  
  useEffect(()=>{
   getCategories();
   getProduct();
  },[])
  const getCategories=()=>{
    fetchDataFromApi("/api/categories?populate=*").then((res)=>{
      
      setCategories(res);
     
    });
  }
  const getProduct=()=>{
    fetchDataFromApi("/api/products?populate=*").then((res)=>{
  
      setProducts(res);
    });
  }
  
  

   
  


  return (
    <div>
    <Banner/>
    <div className='main-content'>
      <div className='layout'>
        {/* api called in categories section */}
        {/* now categories pass in category.jsx */}
      <Category categories={categories}/> 
      <Products products={products}  headingText="Popular Products"/>
      </div>
    </div>
    
    </div>
  )
}

export default Home
