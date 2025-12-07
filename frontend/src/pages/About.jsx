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
            SRM Handloom Weavers is built on the belief that every saree tells a story.
            We bring together traditional handloom craftsmanship and timeless Indian elegance
            to create a shopping experience that celebrates heritage, grace, and artistry.
            Every saree is crafted with attention to detail, quality weaving, and authentic fabric —
            because you deserve to wear a piece of culture that feels as beautiful as it looks.
          </p>

          <p>
            From classic silk sarees to contemporary handloom designs, our goal is to preserve
            the art of saree weaving while making it accessible to modern women. We work closely with
            trusted weavers and artisans across India to ensure every saree reflects
            authenticity, durability, and timeless elegance.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            At SRM Handloom Weavers, our mission is to celebrate India's rich saree heritage — offering
            authentic handloom sarees that honor both tradition and elegance. We aim to make online
            saree shopping seamless and enjoyable through carefully curated collections,
            transparent pricing, and exceptional customer support. Your trust inspires
            us to keep preserving this beautiful art form and delivering sarees you'll cherish wearing.
          </p>

        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Authentic Handloom Quality:</b>
          <p className='text-gray-600'>
            Every saree goes through strict quality checks to ensure authentic fabric,
            traditional weaving techniques, and vibrant, long-lasting colors. We believe
            genuine handloom sarees reflect true craftsmanship and heritage.
          </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            Shop anytime, anywhere. With an easy-to-navigate store and smooth delivery
            experience, SRM Handloom Weavers brings exquisite handloom sarees right to your doorstep.
          </p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our support team is always ready to help you with saree selection, care instructions,
            orders, returns, and queries. We want your saree shopping journey to be as elegant
            as the drape itself.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About