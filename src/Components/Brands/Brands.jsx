import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'

export default function Brands() {
  // Get Brands
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  // Display Brands
  let { data , isLoading , isError , error } = useQuery('brands', getBrands, {
    select: (data) => data?.data?.data,
      defaultOptions : {
        queries : {
          refetchOnWindowFocus:false,
          cacheTime:10*(60*1000),
          staleTime:20000
        }
  }
  })

   // Check on Loading
  if (isLoading) {
    return <Loading/>
  }
  // Check on Error
  if (isError) {
    return <h2>{error.message}</h2>
  }
  
  return <>
  {/* Helmet */}
    <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
    </Helmet>
    
  {/* Content */}
    <h3 className='text-center pt-5 mt-5 pb-3 text-main fw-bold'>All Brands</h3>
    <div className='container pb-5'>
      <div className='row g-4 justify-content-center'>
        {data?.map((brand) => <div className='col-md-2 mx-3 product' key={brand._id}>
            <div className="item text-center">
              <img src={brand.image} alt="brands" className='w-100' loading='lazy'/>
              <h6 className='fw-bold'>{brand.name}</h6>
            </div>
        </div>)}
      </div>
    </div>
    
  </>
}
