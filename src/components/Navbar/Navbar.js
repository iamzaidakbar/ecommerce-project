import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { GrGoogleWallet } from "react-icons/gr";
import "../Navbar/Navbar.scss";

const Navbar = () => {
    const location = useLocation();

    const [cartItemCount, setCartItemCount] = useState(0);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);

    const styles = {
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
    };



    const fetchCounts = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartlist')) || [];
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setCartItemCount(cartItems.length);
        setWishlistItemCount(wishlistItems.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCounts()
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg justify-content-center p-0`}>
            <div className="nav-wrapper container-fluid justify-content-center">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-3  mb-2 mb-lg-0 d-flex align-items-center gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/home'} ><GrGoogleWallet size={'30px'} color={location.pathname === '/home' || location.pathname === '/' ? 'red' : 'white'} /></Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/store'} className={`nav-link text-uppercase text-white ${location.pathname === '/store' && 'active'}`} >All Products</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/clothes'} className={`nav-link text-uppercase text-white ${location.pathname === '/clothes' && 'active'}`} >Clothes</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-white ${location.pathname === '/electronics' && 'active'}`} >Electronics</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 d-flex gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-white`} >About</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-white`} >Contact US</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <Link to={'/wishlist'}>
                                <FaHeart className='icon' color={'white'} size={"20px"} />
                                {wishlistItemCount > 0 && <span className="badge">{wishlistItemCount}</span>}
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center position-relative">
                            <Link to={"/cart"}>
                                <HiOutlineShoppingBag className='icon' color={'white'} size={"20px"} />
                                {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <SlUser className='icon' color={'white'} size={"18px"} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
