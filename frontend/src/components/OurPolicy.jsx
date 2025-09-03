import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-centre py-20 sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold text-center'>Easy Exchange Policy</p>
        <p className='text-gray-400 text-center'>we offer hassle free exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold text-center'>10 Days Return Policy</p>
        <p className='text-gray-400 text-center'>We provide 10 days free return policy</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold text-center'>Customer Support</p>
        <p className='text-gray-400 text-center'>24*7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
