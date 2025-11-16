import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-start'>

        {/* Image with matching height + clean look */}
        <img
          className='w-full max-w-[450px] md:h-full object-cover rounded-lg'
          src={assets.about_img}
          alt="About Us"
        />

        {/* Text section matches height */}
        <div className='flex flex-col justify-between gap-6 text-gray-600 md:h-full'>

          <p>
            VastraLok is built on the belief that fashion should feel effortless.
            We bring together modern trends and timeless Indian aesthetics to create
            a shopping experience that feels personal, comfortable, and stylish.
            Every collection is crafted with attention to detail, quality, and comfort —
            because you deserve clothing that feels as good as it looks.
          </p>

          <p>
            From everyday essentials to statement outfits, our goal is to make fashion
            accessible without compromising on craftsmanship. We work closely with
            trusted manufacturers and designers to ensure every product reflects
            reliability, durability, and elegant design.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            At VastraLok, our mission is to blend tradition with trend — offering
            quality apparel that celebrates both comfort and culture. We aim to make online
            shopping seamless and enjoyable through carefully curated collections,
            transparent pricing, and exceptional customer support. Your trust inspires
            us to keep improving and delivering outfits you’ll love wearing.
          </p>

        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            Every product goes through strict quality checks to ensure fabric comfort,
            stitching durability, and long-lasting color. We believe good clothing
            starts with good quality.
          </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Shop anytime, anywhere. With an easy-to-navigate store and smooth delivery
            experience, VastraLok brings premium fashion right to your doorstep.
          </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our support team is always ready to help you with sizing, orders, returns,
            and queries. We want your shopping journey to be as smooth as your outfit.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About