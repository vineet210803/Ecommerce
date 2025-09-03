
import React, { useContext, useEffect, useState } from 'react'
import { products } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Product from './Product'

const LatestCollection = () => {

const {products} = useContext(ShopContext);
// console.log(products);
const [latestproducts, setLatestproducts]= useState([]);

useEffect(() => {
  setLatestproducts(products.slice(0,15));
}, [])


  return (
    <>
      <div className='my-10 sm:text-center sm:text-xs'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {latestproducts.map((item, index)=>(
          <Product key={index} id={item._id} image={item.image} name={item.name} price={item.price}  />
        ))}
      </div>
    </>
  )
};

export default LatestCollection;
