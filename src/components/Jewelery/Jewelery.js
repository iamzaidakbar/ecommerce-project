import "./Jewelery.scss"

import React, { useEffect, useState } from 'react'
import Showcase from '../Showcase/Showcase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../utils/getAllProducts'
import { addJeweleryItemsToStore } from "../../redux/Slices/jewelerySlice"

const Jewelery = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((store) => store?.jewelery?.jeweleryItems);

  const dispatchProductsToStore = (products) => {
    dispatch(addJeweleryItemsToStore(products))
  };

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      const jewelery = productsData.filter(item => item.category === "jewelery")
      dispatchProductsToStore(jewelery);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <Showcase title={'View All'} products={products} isLoading={isLoading} />
    </div>
  )
}

export default Jewelery