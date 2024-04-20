import React from 'react'
import WidgetArea from './WidgetArea'
import ContentArea from './ContentArea'
import "../styles/allProducts.scss"
import { motion } from 'framer-motion'

// eslint-disable-next-line

const allProducts = () => {

  return (
    <motion.div
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className='container all-products d-flex justify-content-center gap-5'>
      <WidgetArea />
      <ContentArea />
    </motion.div>
  )
}

export default allProducts