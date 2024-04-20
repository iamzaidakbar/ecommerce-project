import React from 'react'
import Banner from './Banner'
import { motion } from 'framer-motion';

const Home = () => {
  return (

    <motion.div
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Banner />
    </motion.div>

  )
}

export default Home