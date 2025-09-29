import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Product from './Product';

const Relatedproduct = ({category, subcategory}) => {

    const {products} = useContext(ShopContext);
    const [related, setrelated]= useState([]);

    useEffect(() => {
      
        if(products.length>0){
            let productscopy = products.slice();
            productscopy = productscopy.filter((item) => category === item.category);
            productscopy = productscopy.filter((item) => subcategory === item.subcategory);
            setrelated(productscopy.slice(1,6));

        }
    }, [products])
    

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'Related'} text2={'Products'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=>(
                    <Product key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>
    </div>
  )
}

export default Relatedproduct
