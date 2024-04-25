import React, { useEffect, useState } from 'react'
import "../AllProducts/AllProducts.scss"
import Showcase from '../Showcase/Showcase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../utils/getAllProducts'
import { addProductsToStore } from '../../redux/Slices/productsSlice'

const AllProducts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((store) => store?.products?.allProducts);

  const dispatchProductsToStore = (products) => {
    dispatch(addProductsToStore(products))
  };

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      dispatchProductsToStore(productsData);
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
      <Showcase title={'Store'} products={products} isLoading={isLoading} />
    </div>
  )
}

export default AllProducts
