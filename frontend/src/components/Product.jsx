import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Product = ({id, image, name, price }) => {
    const {currency}= useContext(ShopContext);
  return (
    <>
    <Link to={`/products/${id}`} className='text-gray-500 cursor-pointer'>
            <div className='overflow-hidden'>
                <img src={image[0]}  className='hover:scale-110 transition-all' alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className=' text-sm font-medium'> {currency} {price}</p>
    </Link>
    </>
  )
}

export default Product
