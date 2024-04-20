import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/getAllProducts';
import { motion } from 'framer-motion';
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { HiShoppingBag } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { fetchSortedProducts } from '../utils/getSortedProductes';
import { useDispatch } from 'react-redux';
import { addProductsToStore } from '../redux/Slices/productsSlice';

const ContentArea = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatchProductsToStore = (products) => {
        dispatch(addProductsToStore(products));
    }

    const fetchData = async () => {
        try {
            const productsData = await fetchProducts();
            dispatchProductsToStore(productsData);
            setProducts(productsData);
            setIsLoading(false);
        } catch (error) {
            // Handle error
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSortChange = async (event) => {
        const sortBy = event.target.value;
        if (sortBy === 'Default') {
            fetchData();
        } else {
            setIsLoading(true);
            try {
                const sortedProducts = await fetchSortedProducts(sortBy.toLowerCase());
                setProducts(sortedProducts);
                dispatchProductsToStore(sortedProducts);
            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='content-area bg-white p-5'>
            <span className='lead route'>Home / Store</span>
            <span className='category'>All Products</span>
            <span className='d-flex justify-content-between'>
                <span className='showing-result'>Showing 1-{products.length} of {products.length} results.</span>
                <select id="selectbox" onChange={handleSortChange}>
                    <option value="Default">Default</option>
                    <option value="arc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </span>
            <span className='results'>
                {isLoading ? (
                    <ShimmerSimpleGallery card imageHeight={200} caption />
                ) : (
                    products.map(item => (
                        <motion.div className='product-card' key={item.id}>
                            <HiShoppingBag className='cart-icon ms-auto' size={'20px'} color={'black'} />
                            <span className='product-img w-100 mt-3 mb-5'>
                                <img src={item.image} className='d-flex mx-auto' alt={item.category} />
                            </span>
                            <span className='product-name mb-2'>
                                <span className='name'>{item.title}</span>
                                <span className='heart-icon'>
                                    <FaHeart size={'20px'} color={'#0000006b'} />
                                </span>
                            </span>
                            <span className='product-category mb-2'>{item.category}</span>
                            <span className='product-price'>${item.price}</span>
                        </motion.div>
                    ))
                )}
            </span>
        </div>
    );
};

export default ContentArea;
