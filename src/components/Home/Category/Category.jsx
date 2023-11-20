import React from 'react'
import {useNavigate} from  "react-router-dom";
import "./Category.scss";


function Category({categories}) {
  const navigate=useNavigate();
  
 
  //basically we run this through loop, using api calling
  return (
    <>
    <div className='shop-by-category'>
      <div className='categories'>
        {/* here we are running loop  */}
        {/* Why it is necessary to optional chaining just because it is undefined while response then it will stopped further respo0nsing */}
        {categories && categories?.data && categories?.data?.map((item) => (
          //whenver i click category sectopn i will redirect to another page like category section
  <div key={item.id} className='category' onClick={()=>navigate(`/category/${item.id}`)}>
    {/* Access the image URL from the nested structure */}
     <img src={process.env.REACT_APP_STRIPE_APP_DEV_URL + item.attributes.img.data.attributes.url} alt="" />
  </div>
))} 



      </div>
    </div>
     </>
  )
}

export default Category;
