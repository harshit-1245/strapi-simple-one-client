import React from 'react';
import "./Product.scss";

import { useNavigate } from 'react-router-dom';

function Product({ id, data }) {
  const navigate=useNavigate();
  return (
    <div className='product-card' onClick={()=>navigate("/product/"+id)}>
      <div className='thumbnail'>
       
        {/* Access the image URL from the 'data' prop */}

         
        {data?.img && data?.img?.data && data?.img?.data[0] && data?.img?.data[0]?.attributes && (
  <img
    src={process.env.REACT_APP_STRIPE_APP_DEV_URL + data?.img?.data[0]?.attributes?.url}
    alt=""
  />
)}

    
      </div>

      <div className='product-details'>
        {/* Use the 'data' prop for the product name and price */}
        <span className='name'>{data.title}</span>
        <span className='price'>&#8377;{data.price}</span>
      </div>
    </div>
  );
}

export default Product;
