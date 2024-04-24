import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineShoppingBag } from "react-icons/md";
import {  FaUser } from "react-icons/fa";
import { GrGoogleWallet } from "react-icons/gr";
import "../Navbar/Navbar.scss"

const Navbar = () => {
    const location = useLocation()

    const styles = {
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
    }

    return (
        <nav className={`navbar navbar-expand-lg border-bottom justify-content-center px-2 `}>
            <div className="container-fluid justify-content-center">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-3  mb-2 mb-lg-0 d-flex align-items-center gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-black ${location.pathname === '/' && 'active'}`} ><GrGoogleWallet size={'30px'} color={location.pathname === '/' ? 'red' : 'black'} /></Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/store'} className={`nav-link text-uppercase text-black ${location.pathname === '/store' && 'active'}`} >All Products</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/clothes'} className={`nav-link text-uppercase text-black ${location.pathname === '/clothes' && 'active'}`} >Clothes</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-black ${location.pathname === '/electronics' && 'active'}`} >Electronics</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 d-flex gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-black`} >About</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase text-black`} >Contact US</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <MdOutlineShoppingBag color={'black'} size={"20px"} />
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <FaUser color={'black'} size={"18px"} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar