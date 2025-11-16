import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, bestseller }) => {

  const { currency } = useContext(ShopContext)

  // OLD PRICE (30% higher)
  const oldPrice = Math.round(price * 1.3)

  return (
    <Link 
      className="text-gray-700 cursor-pointer block"
      to={`/product/${id}`}
    >
      <div className="relative overflow-hidden rounded-lg bg-white transition-all duration-300">

        {/* ⭐ BEST SELLER BADGE (only if true) */}
        {bestseller && (
          <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            BEST SELLER
          </span>
        )}

        {/* PRODUCT IMAGE */}
        <img
          className="w-full h-64 sm:h-72 object-cover hover:scale-110 transition-transform duration-300"
          src={image[0]}
          alt={name}
        />
      </div>

      {/* PRODUCT NAME */}
      <p className="pt-3 pb-1 text-sm font-medium truncate">
        {name}
      </p>

      {/* PRICE SECTION WITH CUT-PRICE */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-black">
          {currency}{price}
        </p>

        <p className="text-sm text-gray-500 line-through">
          {currency}{oldPrice}
        </p>
      </div>

    </Link>
  )
}

export default ProductItem
