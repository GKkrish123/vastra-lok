import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        //API calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-6 pt-6 pb-10 min-h-[70vh] border-t'>

      {/* Left: Delivery form */}
      <div className='flex-1'>
        <div className='mb-6'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='bg-white border rounded-lg shadow-sm p-5 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='First name' type="text" />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='Last name' type="text" />
          </div>

          <input required onChange={onChangeHandler} name='email' value={formData.email}
            className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
            placeholder='Email' type="email" />

          <input required onChange={onChangeHandler} name='street' value={formData.street}
            className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
            placeholder='Street' type="text" />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='City' type="text" />
            <input required onChange={onChangeHandler} name='state' value={formData.state}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='State' type="text" />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='Zipcode' type="number" />
            <input required onChange={onChangeHandler} name='country' value={formData.country}
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
              placeholder='Country' type="text" />
          </div>

          <input required onChange={onChangeHandler} name='phone' value={formData.phone}
            className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-orange-300'
            placeholder='Phone' type="number" />
        </div>

        {/* Small note */}
        <p className='text-sm text-gray-500 mt-3'>
          We will use this address to deliver your order. Make sure the details are correct.
        </p>
      </div>

      {/* Right: Order summary & payment */}
      <aside className='w-full lg:w-[420px] flex-shrink-0'>
        <div className='lg:sticky lg:top-24 space-y-6'>

          {/* Summary card */}
          <div className='bg-white border rounded-lg shadow-sm p-4'>
            <CartTotal />
          </div>

          {/* Payment methods */}
          <div className='bg-white border rounded-lg shadow-sm p-4'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='mt-3 grid grid-cols-1 gap-3'>
              {/* Stripe */}
              <button
                type='button'
                onClick={() => setMethod('stripe')}
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  method === 'stripe' ? 'border-orange-500 shadow-sm bg-orange-50' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${method === 'stripe' ? 'bg-green-400' : 'border'}`}></span>
                <img className='h-6' src={assets.stripe_logo} alt='stripe' />
                <span className='ml-auto text-sm font-medium'>Pay with Stripe</span>
              </button>

              {/* Razorpay */}
              <button
                type='button'
                onClick={() => setMethod('razorpay')}
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  method === 'razorpay' ? 'border-orange-500 shadow-sm bg-orange-50' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${method === 'razorpay' ? 'bg-green-400' : 'border'}`}></span>
                <img className='h-6' src={assets.razorpay_logo} alt='razorpay' />
                <span className='ml-auto text-sm font-medium'>Pay with Razorpay</span>
              </button>

              {/* COD */}
              <button
                type='button'
                onClick={() => setMethod('cod')}
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  method === 'cod' ? 'border-orange-500 shadow-sm bg-orange-50' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${method === 'cod' ? 'bg-green-400' : 'border'}`}></span>
                <span className='ml-1 text-sm font-medium text-gray-700'>Cash on Delivery</span>
                <span className='ml-auto text-xs text-gray-500'>Pay when delivered</span>
              </button>
            </div>

            <div className='mt-6'>
              <button type='submit' className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition'>
                PLACE ORDER
              </button>
            </div>
          </div>

          {/* Small help text */}
          <div className='text-xs text-gray-500'>
            <p>Need help? Contact our support at <span className='text-gray-700'>support@vastralok.com</span>.</p>
          </div>

        </div>
      </aside>

    </form>
  )
}

export default PlaceOrder
