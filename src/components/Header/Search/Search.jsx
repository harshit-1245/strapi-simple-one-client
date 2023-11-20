import React, { useState } from 'react'
import {MdClose} from "react-icons/md"
import prod from "../../../assets/category/download-3.jpg"
import "./Search.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";

const Search = ({setShowSearch}) => {
  const [query,setQuery]=useState("");
  const navigate=useNavigate();

  let onChange=(e)=>{
    setQuery(e.target.value);
  }

//this end point has some opertaor go on stripi documentation to understand
//this helps to 



let { data } = useFetch(
  `/api/products?populate=*&filters[title][$contains]=${query}`
);
console.log(data)
//if there is nothing in search
if(!query.length){
  data=null;
}


  return (
    <div className="search-modal">
      <div className="form-field">
        <input type="text" 
        autoFocus
        placeholder='Search for products'
        value={query}
        onChange={onChange}/>
        <MdClose onClick={()=>setShowSearch(false)}/>
      </div>
      <div className="search-result-content">
        <div className="search-results">
        {data?.data?.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                       onClick={()=>{navigate("/product/" + item.id)
                      setShowSearch(false)}}     
                           
                >
                            <div className="image-container">
                              {/* this is super error that thakes soo much time to fix it */}
                            {item?.img && item?.img?.data && item?.img?.data[0] && item?.img?.data[0]?.attributes && (
  <img
    src={process.env.REACT_APP_STRIPE_APP_DEV_URL + item?.attributes?.img?.data[0]?.attributes?.url}
    alt=""
  />
)}
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.attributes.title}
                                </span>
                                <span className="desc">
                                    {item.attributes.description}
                                </span>
                            </div>
                        </div>
                    ))}
         
        </div>
      </div>
    </div>
  )
}

export default Search
