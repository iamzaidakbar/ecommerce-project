import React, { useEffect, useState } from 'react'
import Showcase from '../Showcase/Showcase'
import { useDispatch, useSelector } from 'react-redux'
import { addClothesToStore } from '../../redux/Slices/clothingSlice'
import { fetchProducts } from '../../utils/getAllProducts'
import image from "../../assets/women_in_yellow.jpg"


const Clothes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((store) => store?.clothes?.clothes);

  const dispatchProductsToStore = (products) => {
    dispatch(addClothesToStore(products))
  };

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      const clothes = productsData.filter(item => item.category === "men's clothing" || item.category === "women's clothing")
      dispatchProductsToStore(clothes);
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
      <Showcase title={'View All'} image={image} products={products} isLoading={isLoading} />
    </div>
  )
}

export default Clothes