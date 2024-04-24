import "../Showcase/Showcase.scss"
import banner from "../../../src/assets/widget.webp"
import { motion } from "framer-motion";
import { BsSquare } from "react-icons/bs";
import { PiSquaresFourThin } from "react-icons/pi";
import { TbBorderNone } from "react-icons/tb"

import React, { useState } from 'react'
import MultiRangeSlider from "../MultiRangeSlider";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import ProductCard from "../ProductCard";

const Showcase = ({ products, isLoading, title, image }) => {
    const { pathname } = useLocation()
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(300);
    const [layout, setLayout] = useState('large')
    const [sortOption, setSortOption] = useState('Default');
    const [selectedCategory, setSelectedCategory] = useState(title);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        let filtered = products;

        // Apply search filter if searchQuery is not empty
        if (searchQuery) {
            filtered = filtered?.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply price range filter
        filtered = filtered?.filter(item => item.price >= minVal && item.price <= maxVal);

        // Apply filter for category
        filtered = filtered?.filter(item => {
            if (selectedCategory === "Men's Wear") {
                return item.category === "men's clothing";
            } else if (selectedCategory === "Women's Wear") {
                return item.category === "women's clothing";
            } else {
                return true; // Show all products for "View All"
            }
        });


        setFilteredProducts(filtered);
    }, [products, searchQuery, minVal, maxVal, selectedCategory]);

    useEffect(() => {
        if (localStorage.getItem(pathname)) {
            setLayout(localStorage.getItem(pathname))
        }
    }, [])

    return (
        <div className="showcase d-flex flex-column">
            <span className="route text-center py-4">Home / {pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)} / <strong className="text-danger h5">{selectedCategory}</strong></span>
            <div className="banner mx-auto">
                <img loading="lazy" src={image} alt="Banner" />
                <span className="shop-buttons">
                    <motion.button onClick={() => {
                        setSelectedCategory("Women's Wear")
                    }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">For Her</motion.button>
                    <motion.button onClick={() => {
                        setSelectedCategory("Men's Wear")
                    }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">For Him</motion.button>
                    {selectedCategory != 'View All' && <motion.button onClick={() => {
                        setSelectedCategory("View All")
                    }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">View All</motion.button>}
                </span>
            </div>
            <div className="showcase-content d-flex flex-column gap-3 py-4 mx-auto">
                <span className="selected-category">{selectedCategory}</span>
                <span className="showing-result">Showing 1-{filteredProducts?.length} of {filteredProducts?.length} results</span>
                <div className="filters d-flex align-items-center justify-content-between">


                    {/* Search Filter */}


                    <section>
                        <input
                            type="search"
                            className="form-control form-control-sm rounded-0"
                            placeholder="Search Products..."
                            onChange={(e) => { setSearchQuery(e.target.value) }}
                        />
                    </section>


                    <section className="d-flex align-items-center gap-4">


                        {/* Price Filter */}

                        <span className="price-filter d-flex align-items-center gap-2">
                            <span className="price-val">${minVal < 10 && 0}{minVal}</span>
                            <MultiRangeSlider
                                min={0}
                                max={300}
                                onChange={({ min, max }) => {
                                    setMinVal(min);
                                    setMaxVal(max);
                                }}
                            />
                            <span className="price-val">${maxVal}</span>
                        </span>

                        {/* Total Result */}


                        <span className="total-result">{filteredProducts?.length} ITEMS</span>

                        {/* Sort Filter */}


                        <select id="selectbox" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="Sort By">Sort By</option>
                            <option value="Default">Deafult</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>

                        {/* Layout Filter*/}


                        <span className="layout-filter d-flex align-items-center gap-3">
                            <BsSquare onClick={() => {
                                setLayout('large')
                                localStorage.setItem(pathname, 'large')
                                toast.success("Layout Changed to Large Successfully.")
                            }} className="icon ms-2" color={layout === 'large' ? "red" : 'black'} size='18px' />
                            <PiSquaresFourThin onClick={() => {
                                setLayout('medium')
                                localStorage.setItem(pathname, 'medium')
                                toast.success("Layout Changed to Medium Successfully.")
                            }} className="icon" color={layout === 'medium' ? "red" : 'black'} size='25px' />
                            <TbBorderNone onClick={() => {
                                setLayout('small')
                                localStorage.setItem(pathname, 'small')
                                toast.success("Layout Changed to Small Successfully.")
                            }} className="icon" color={layout === 'small' ? "red" : 'black'} size='25px' />
                        </span>

                    </section>

                </div>


                <span className="products mt-5">
                    {(isLoading || filteredProducts?.length === 0) ? (
                        <ShimmerSimpleGallery card imageHeight={200} caption />
                    ) : (
                        (() => {
                            let sortedProducts = [...filteredProducts];
                            if (sortOption === 'asc') {
                                sortedProducts.sort((a, b) => a.price - b.price);
                            } else if (sortOption === 'desc') {
                                sortedProducts.sort((a, b) => b.price - a.price);
                            }
                            return sortedProducts.map((item) => (
                                <ProductCard item={item} layout={layout} />
                            ));
                        })()
                    )}
                </span>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Showcase