import React,{useContext,useState,useEffect} from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=> item !== e.target.value))
    } else {
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item=> item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t'>

      {/* ================= FILTER SIDEBAR ================= */}
      <div className='min-w-full sm:min-w-[240px] self-start 
                bg-white sm:border sm:border-gray-200 sm:rounded-xl 
                p-3 sm:p-4 shadow-none sm:shadow-sm'>
        <p 
          onClick={()=>setShowFilter(!showFilter)} 
          className='my-2 text-xl font-semibold flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
        </p>

        {/* CATEGORY */}
        <div className={`${showFilter ? '' : 'hidden'} sm:block border border-gray-200 rounded-lg p-4 mt-4`}>
          <p className='mb-3 text-sm font-semibold'>SAREE TYPE</p>
          
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Silk Sarees'} onChange={toggleCategory}/> Silk Sarees
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Cotton Sarees'} onChange={toggleCategory}/> Cotton Sarees
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Handloom Sarees'} onChange={toggleCategory}/> Handloom Sarees
            </label>
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className={`${showFilter ? '' : 'hidden'} sm:block border border-gray-200 rounded-lg p-4 mt-5`}>
          <p className='mb-3 text-sm font-semibold'>OCCASION</p>

          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Festive'} onChange={toggleSubCategory}/> Festive
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Casual'} onChange={toggleSubCategory}/> Casual
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value={'Bridal'} onChange={toggleSubCategory}/> Bridal
            </label>
          </div>
        </div>

      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className='flex-1'>

        {/* Header: Title + Sort */}
        <div className='flex justify-between items-center mb-6'>
          <Title text1={'SAREE'} text2={'COLLECTION'} />

          <select 
            onChange={(e)=>setSortType(e.target.value)} 
            className='border border-gray-300 bg-white rounded-md text-sm px-3 py-2 shadow-sm'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8'>
          {filterProducts.map((item,index)=>(
            <ProductItem 
              key={index} 
              name={item.name} 
              id={item._id} 
              price={item.price} 
              image={item.image}
              bestseller={item.bestseller}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection
