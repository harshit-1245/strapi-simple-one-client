import React, { useState } from 'react'
import Products from "../Products/Products";
import { useParams } from 'react-router-dom';
import './Category.scss';

import prod from "../../assets/category/download-1.jpeg"
import useFetch from '../../hooks/useFetch';
function Category() {
  //fro accesing it you need to add useParams
  const {id}=useParams();
  //we need to give end points
  //using filters through documentation
  const {data}=useFetch(`/api/products?populate=*&[filters][categories][id]=${id}`)
    

 
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          {/* this will change title dynamically */}
          {data?.data?.[0].attributes?.categories?.data?.[0]?.attributes?.title}
        </div>
        {/* using usefetch data */}
        <Products innerPage={true} products={data}/>
      </div>
    </div>
  )
}

export default Category
