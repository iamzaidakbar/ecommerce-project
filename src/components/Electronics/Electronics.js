import React, { useEffect, useState } from 'react'
import Showcase from '../Showcase/Showcase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../utils/getAllProducts'
import { addElectronicItemsToStore } from '../../redux/Slices/electronicsSlice'

const Electronics = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((store) => store?.electronics?.electronicItems);

  const dispatchProductsToStore = (products) => {
    dispatch(addElectronicItemsToStore(products))
  };

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      const electronics = productsData.filter(item => item.category === "electronics")
      dispatchProductsToStore(electronics);
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

export default Electronics