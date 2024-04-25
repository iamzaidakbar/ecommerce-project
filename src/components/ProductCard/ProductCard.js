import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GiShoppingBag } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, layout }) => {
    const navigate = useNavigate();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsInWishlist(existingWishlist.some(wishlistItem => wishlistItem.id === item.id));
    }, [item.id]);

    const addItemToWishlist = (e, newItem) => {
        e.stopPropagation();
        const existingWishlistJSON = localStorage.getItem('wishlist') || '[]';
        const existingWishlist = JSON.parse(existingWishlistJSON);

        if (isInWishlist) {
            const updatedWishlist = existingWishlist.filter(wishlistItem => wishlistItem.id !== newItem.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(false);

        } else {
            const updatedWishlist = [...existingWishlist, newItem];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(true);
        }
    }

    useEffect(() => {
        const existingCartlist = JSON.parse(localStorage.getItem('cartlist')) || [];
        setIsInCart(existingCartlist.some(cartlistItem => cartlistItem.id === item.id));
    }, [item.id]);

    const addItemToCart = (e, newItem) => {
        e.stopPropagation();
        const existingCartlistJSON = localStorage.getItem('cartlist') || '[]';
        const existingCartlist = JSON.parse(existingCartlistJSON);

        if (isInCart) {
            const updatedcartlist = existingCartlist.filter(cartlistItem => cartlistItem.id !== newItem.id);
            localStorage.setItem('cartlist', JSON.stringify(updatedcartlist));
            setIsInCart(false);

        } else {
            const updatedcartlist = [...existingCartlist, newItem];
            localStorage.setItem('cartlist', JSON.stringify(updatedcartlist));
            setIsInCart(true);
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                onClick={() => { navigate('/product/' + item.id) }}
                className={`product-card ${layout}`} style={{ width: layout === 'small' ? '19.5%' : (layout === 'medium' ? '24%' : '33%') }} key={item.id}>
                {isInCart
                    ? <GiShoppingBag onClick={(e) => { addItemToCart(e, item) }} className="cart-icon ms-auto" size={'20px'} color={'black'} />
                    : <HiOutlineShoppingBag onClick={(e) => { addItemToCart(e, item) }} className="cart-icon ms-auto" size={'20px'} color={'black'} />}
                <span style={{ height: layout === 'small' ? '150px' : (layout === 'medium' ? '280px' : '450px') }} className="product-img w-100 mt-3 mb-5">
                    <img loading='lazy' src={item.image} className="d-flex mx-auto" alt={item.category} />
                </span>
                <span className="product-name mb-2">
                    <span className="name">{item.title}</span>
                    <span className="heart-icon">
                        <FaHeart onClick={(e) => { addItemToWishlist(e, item) }} size={'20px'} color={isInWishlist ? 'red' : 'black'} style={{ cursor: 'pointer' }} />
                    </span>
                </span>
                <span className="product-category mb-2">{item.category}</span>
                <span className="product-price">${item.price}</span>
            </motion.div>
        </>
    )
}

export default ProductCard;
