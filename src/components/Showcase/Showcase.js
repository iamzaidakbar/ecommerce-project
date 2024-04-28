import "../Showcase/Showcase.scss";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { BsSquare } from "react-icons/bs";
import { PiSquaresFourThin } from "react-icons/pi";
import { TbBorderNone } from "react-icons/tb";
import MultiRangeSlider from "../MutiRangeSlider/MultiRangeSlider";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import useAlert from "../../utils/useAlert";

const Showcase = ({ products, isLoading, title, image }) => {
    const { handleAlertClose, handleAlertOpen } = useAlert();
    const { pathname } = useLocation();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(300);
    const [layout, setLayout] = useState('large');
    const [sortOption, setSortOption] = useState('Default');
    const [selectedCategory, setSelectedCategory] = useState(title);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        let filtered = products?.filter(item => {
            if (selectedCategory === "Men's Wear") {
                return item.category === "men's clothing";
            } else if (selectedCategory === "Women's Wear") {
                return item.category === "women's clothing";
            } else {
                return true;
            }
        });

        if (searchQuery) {
            filtered = filtered?.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        filtered = filtered?.filter(item => item.price >= minVal && item.price <= maxVal);

        setFilteredProducts(filtered);
    }, [products, searchQuery, minVal, maxVal, selectedCategory]);

    useEffect(() => {
        const storedLayout = localStorage.getItem(pathname);
        if (storedLayout) {
            setLayout(storedLayout);
        }
    }, []);

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        localStorage.setItem(pathname, newLayout);
        handleAlertOpen('success', 'Layout changed to ' + newLayout, '#1fae15');

        setTimeout(() => {
            handleAlertClose();
        }, 5000)
    };

    return (
        <div className="showcase d-flex flex-column">
            <span className="route text-center py-4">Home / {pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)} / <strong className="text-danger h5">{selectedCategory}</strong></span>
            {image && (
                <div className="banner mx-auto">
                    <img loading="lazy" src={image} alt="Banner" />
                    <span className="shop-buttons">
                        <motion.button onClick={() => setSelectedCategory("Women's Wear")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">For Her</motion.button>
                        <motion.button onClick={() => setSelectedCategory("Men's Wear")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">For Him</motion.button>
                        {selectedCategory !== 'View All' && <motion.button onClick={() => setSelectedCategory("View All")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }} className="btn btn-outline-dark btn-sm rounded-0 px-4">View All</motion.button>}
                    </span>
                </div>
            )}
            <div className="showcase-content d-flex flex-column gap-3 py-4 mx-auto">
                <span className="selected-category">{selectedCategory}</span>
                <span className="showing-result">Showing 1-{filteredProducts?.length} of {filteredProducts?.length} results</span>
                <div className="filters d-flex align-items-center justify-content-between">
                    <section>
                        <input
                            type="search"
                            className="form-control form-control-sm rounded-0"
                            placeholder="Search Products..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </section>
                    <section className="d-flex align-items-center gap-4">
                        <span className="price-filter d-flex align-items-center gap-2">
                            <span className="price-val">${minVal < 10 ? `0${minVal}` : minVal}</span>
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
                        <span className="total-result">{filteredProducts?.length} ITEMS</span>
                        <select id="selectbox" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="Sort By">Sort By</option>
                            <option value="Default">Deafult</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <span className="layout-filter d-flex align-items-center gap-3">
                            <BsSquare onClick={() => handleLayoutChange('large')} className="icon ms-2" color={layout === 'large' ? "red" : 'black'} size='18px' />
                            <PiSquaresFourThin onClick={() => handleLayoutChange('medium')} className="icon" color={layout === 'medium' ? "red" : 'black'} size='25px' />
                            <TbBorderNone onClick={() => handleLayoutChange('small')} className="icon" color={layout === 'small' ? "red" : 'black'} size='25px' />
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
                                <ProductCard key={item.id} item={item} layout={layout} />
                            ));
                        })()
                    )}
                </span>
            </div>
        </div>
    );
}

export default Showcase;
