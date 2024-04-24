import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaAmazon, FaUser } from "react-icons/fa";
import "../styles/navbar.scss"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const styles = {
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
    }

    const isActive = location.pathname === '/home' || location.pathname === "/"

    return (
        <nav className={`navbar navbar-expand-lg border-bottom justify-content-center px-2 ${isActive ? 'active' : 'unactive'}`}>
            <div className="container-fluid justify-content-center">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-3  mb-2 mb-lg-0 d-flex gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/store'} className={`nav-link text-uppercase ${isActive ? 'text-white' : 'text-black'} ${location.pathname === '/store' && 'active'}`} >All Products</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/clothes'} className={`nav-link text-uppercase ${isActive ? 'text-white' : 'text-black'} ${location.pathname === '/clothes' && 'active'}`} >Clothes</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase ${isActive ? 'text-white' : 'text-black'} ${location.pathname === '/electronics' && 'active'}`} >Electronics</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 d-flex gap-3">
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase ${isActive ? 'text-white' : 'text-black'}`} >About</Link>
                        </li>
                        <li style={styles} className="nav-item">
                            <Link to={'/'} className={`nav-link text-uppercase ${isActive ? 'text-white' : 'text-black'}`} >Contact US</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <MdOutlineShoppingBag color={isActive ? 'white' : 'black'} size={"20px"} />
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <FaUser color={isActive ? 'white' : 'black'} size={"20px"} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar