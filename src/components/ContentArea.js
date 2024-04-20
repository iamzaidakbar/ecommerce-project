import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/getAllProducts';
import { color, motion } from 'framer-motion';
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { HiShoppingBag } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

const ContentArea = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
                setIsLoading(false);
            } catch (error) {
                // Handle error
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='content-area bg-white p-5'>
            <span className='lead route'>Home / Store</span>
            <span className='category'>All Products</span>
            <span className='d-flex justify-content-between'>
                <span className='showing-result'>Showing 1-{products.length} of {products.length} results.</span>
                <select id="selectbox">
                    <option value="">Default</option>
                    <option value="january">Ascending</option>
                    <option value="january">Descending</option>
                </select>
            </span>
            <span className='results'>
                {isLoading ? (
                    <ShimmerSimpleGallery card imageHeight={200} caption />
                ) : (
                    products.map(item => (
                        <motion.div className='product-card' key={item?.id}>
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
