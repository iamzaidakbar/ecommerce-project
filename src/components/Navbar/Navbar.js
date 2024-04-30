import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { IoIosCube } from "react-icons/io";
import "../Navbar/Navbar.scss";
import { auth } from '../../Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore} from "../../redux/Slices/userSlice"
import { motion } from 'framer-motion';
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import useAlert from '../../utils/useAlert';
import useGoogle from '../../utils/useGoogle';
import useLogout from '../../utils/useLogout';

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { handleAlertClose } = useAlert();
    const { signInWithGoogle } = useGoogle()
    const { logoutUser } = useLogout()

    const [cartItemCount, setCartItemCount] = useState(0);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);
    const [navActive, setNavActive] = useState(false)

    const activeUser = useSelector(store => store?.user?.user)
    const alert = useSelector(store => store?.alert)


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
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (auth?.currentUser) {
            const dataToDispatch = {
                username: auth?.currentUser.displayName,
                email: auth?.currentUser.email,
                uid: auth?.currentUser.uid,
                profile: auth?.currentUser.photoURL,
                isLoggedIn: true,
            }
            dispatch(addUserToStore(dataToDispatch))
        }
    }, [auth?.currentUser])

    return (
        <nav onMouseLeave={() => { setNavActive(false) }} className="navbar navbar-expand-lg">
            <div className="nav-wrapper container-fluid p-2">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{
                }} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex align-items-center gap-2">
                        <li style={styles} className="nav-item">
                            <Link className='border-0' to={'/store'} ><IoIosCube className='icon' size={'30px'} color={location.pathname === '/store' || location.pathname === '/' ? 'red' : 'white'} /></Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/store'} className={`nav-link text-uppercase text-white ${location.pathname === '/store' && 'active'}`} >All Products</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/clothes'} className={`nav-link text-uppercase text-white ${location.pathname === '/clothes' && 'active'}`} >Clothes</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/electronics'} className={`nav-link text-uppercase text-white ${location.pathname === '/electronics' && 'active'}`} >Electronics</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/jewelery'} className={`nav-link text-uppercase text-white ${location.pathname === '/jewelery' && 'active'}`} >Jewelery</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/about'} className={`nav-link text-uppercase text-white`} >About</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/contact'} className={`nav-link text-uppercase text-white`} >Contact US</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center me-2">
                            <Link className='border-0' to={'/wishlist'}>
                                <FaHeart className='icon' color={'white'} size={"20px"} />
                                {wishlistItemCount > 0 && localStorage.getItem('token') && <span className="badge">{wishlistItemCount}</span>}
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center me-2">
                            <Link className='border-0' to={"/checkout/cart"}>
                                <HiOutlineShoppingBag className='icon' color={'white'} size={"20px"} />
                                {cartItemCount > 0 && localStorage.getItem('token') && <span className="badge">{cartItemCount}</span>}
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {activeUser ? <span style={{ cursor: 'pointer' }} className='d-flex align-items-center gap-3'><img onMouseOver={() => { setNavActive(true) }} className='rounded-circle' src={activeUser?.profile} height={'30px'} width={'30px'} /></span> : <span onClick={signInWithGoogle} style={{ cursor: 'pointer' }} className='d-flex align-items-center gap-2'><SlUser className='icon' color={'white'} size={"18px"} /> <p className='m-0 signin-action'>Sign In</p></span>}
                            {navActive && <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, }}
                                exit={{ opacity: 0 }}
                                style={{ transform: 'translate(0, 90px)' }}
                                className='active-user'>
                                <img src={activeUser?.profile} />
                                <div className='user-details'>
                                    <p className='m-0 username'>{activeUser?.username}</p>
                                    <p className='m-0 email'>{activeUser?.email}</p>
                                    <button onClick={logoutUser} className='btn btn-sm rounded-0'>Sign Out</button>
                                </div>
                            </motion.div>
                            }
                        </li>
                    </ul>
                </div>
            </div>


            <motion.div
                transition={{ ease: "easeOut", duration: 0.1 }}
                animate={{ x: alert?.alertMessage?.length > 0 ? 710 : 0 }}
                className="alert d-flex align-items-center gap-2"
                style={{ backgroundColor: alert?.color || 'black', animation: alert?.alertMessage?.length > 0 && 'glowing .5s infinite alternate', '--box-shadow-color': alert?.color || 'black' }}>

                {alert && (
                    <>
                        {alert.alertType === 'error' && <MdError color='white' size={'24px'} />}
                        {alert.alertType === 'warning' && <IoIosWarning color='yellow' size="24px" />}
                        {alert.alertType === 'success' && <FaCheckCircle color='white' size="24px" />}
                        <p className='m-0 error-message'>{alert.alertMessage}</p>
                        <RxCross2 onClick={handleAlertClose} className='ms-3' size="20px" color={'white'} />
                    </>
                )}
            </motion.div>


        </nav >
    );
};

export default Navbar;
