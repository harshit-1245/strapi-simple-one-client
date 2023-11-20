
import React from 'react'
import "./Products.scss"
import Product from './Product/Product'

function Products({ products, innerPage, headingText }) {
  return (
    <div>
      <div className="products-container">
        {!innerPage && <div className='sec-heading'>{headingText}</div>}
        <div className='products'>
          {products && products?.data && products?.data?.map((item) => {
            // Log the item for debugging
            

            return (
              <Product
                key={item.id}
                id={item.id}
                data={item.attributes}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}



export default Products;