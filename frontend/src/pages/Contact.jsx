import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

        {/* Smaller Image */}
        <img 
          className='w-full md:max-w-[380px] rounded-lg object-cover' 
          src={assets.contact_img} 
          alt="Contact" 
        />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>

          {/* Updated Indian Address */}
          <p className='text-gray-500'>
            Awalkhera, Agra <br />
            Uttar Pradesh, India – 283201
          </p>

          <p className='text-gray-500'>
            Tel: +91 9876543210 <br />
            Email: support@vastralok.com
          </p>

          <p className='font-semibold text-xl text-gray-600'>Careers at VastraLok</p>

          <p className='text-gray-500'>
            Join our growing team and help us preserve India's rich saree heritage.
          </p>

          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
