import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { InstagramIcon } from 'lucide-react'

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
            NO. 14/31, <br />
            Ennaikara Street(Opp to Jain Temple) <br />
            Kanchipuram <br />
            Tamil Nadu, India – 631502
          </p>

          <p className='text-gray-500'>
            Tel: +91 9500458909 / +91 9500458979 <br />
            Email: srmhandloomweavers@gmail.com
            <a href="https://www.instagram.com/srm_weavers" className='flex items-center gap-2' target="_blank" rel="noopener noreferrer"><InstagramIcon className='w-5 h-5' /> @srm_weavers</a>
          </p>

          {/* <p className='font-semibold text-xl text-gray-600'>Careers at SRM Handloom Weavers</p>

          <p className='text-gray-500'>
            Join our growing team and help us preserve India's rich saree heritage.
          </p>

          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button> */}
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
