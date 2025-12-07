import React from 'react'
import { assets } from '../assets/assets'
import { InstagramIcon } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Brand Info */}
        <div>
          <img src={assets.logo} className='mb-5 w-24 rounded-xl' />
          <p className='w-full md:w-2/3 text-gray-600'>
            SRM Handloom Weavers — celebrating India's saree heritage. 
            Discover authentic handloom sarees that blend tradition with timeless elegance, woven for every special moment.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>

            <li>
              <a href="/" className='hover:text-black'>Home</a>
            </li>

            <li>
              <a href="/about" className='hover:text-black'>About Us</a>
            </li>

            <li>
              <a href="/collection" className='hover:text-black'>Collection</a>
            </li>

            <li>
              <a href="/privacy" className='hover:text-black'>Privacy Policy</a>
            </li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9500458909 <br />+91 9500458979</li>
            <li>srmhandloomweavers@gmail.com</li>
            <a href="https://www.instagram.com/srm_weavers" className='flex items-center gap-2' target="_blank" rel="noopener noreferrer"><InstagramIcon className='w-5 h-5' /> @srm_weavers</a>
          </ul>
        </div>  

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © {new Date().getFullYear()} SRM Handloom Weavers — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
