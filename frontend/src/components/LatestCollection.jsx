import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Product from './Product'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestproducts, setLatestproducts] = useState([])

  useEffect(() => {
    setLatestproducts(products.slice(0, 15))
  }, [products])

  return (
    <>
      {/* Section Wrapper */}
      <div className="my-14 px-4 sm:px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-10">
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        </div>

        {/* Product Grid */}
        <div
          className="
            grid grid-cols-2 gap-5 gap-y-8
            sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
          "
        >
          {latestproducts.map((item, index) => (
            <div
              key={index}
              className="transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              <Product
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LatestCollection
