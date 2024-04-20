import React from 'react'
import WidgetArea from './WidgetArea'
import ContentArea from './ContentArea'
import "../styles/allProducts.scss"

const allProducts = () => {

  return (
    <div className='container all-products d-flex justify-content-center gap-5'>
        <WidgetArea />
        <ContentArea />
    </div>
  )
}

export default allProducts