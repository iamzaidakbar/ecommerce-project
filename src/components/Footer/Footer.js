import { Link } from "react-router-dom"
import "../Footer/Footer.scss"

import React from 'react'

const Footer = () => {
    return (
        <div className="footer border">
            <section className="shopping">
                <label>SHOP</label>
                <ul>
                    <li>
                        <Link to={'/clothes'}>Men</Link>
                    </li>
                    <li>
                        <Link to={'/clothes'}>Ladies</Link>
                    </li>
                    <li>
                        <Link to={'/electronics'}>Electronics</Link>
                    </li>
                    <li>
                        <Link to={'/jewellery'}>jewellery</Link>
                    </li>
                </ul>
            </section>
            <section className="creater-info">
                <label>Corporate Info</label>
                <ul>
                    <li>
                        <a href="https://portfolio-zaidakbar.netlify.app/" target="_blank">About Creater</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/zaidakbar/" target="_blank">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://github.com/iamzaidakbar" target="_blank">Github</a>
                    </li>
                    <li>
                        <a href="https://instagram.com/1amzaidakbar" target="_blank">Instagram</a>
                    </li>
                </ul>
            </section>
            <section className="help">
                <label>Contact</label>
                <ul>
                    <li>
                        <Link to={'/contact'}>Contact Creater</Link>
                    </li>
                </ul>
            </section>
            <section className="copyright">
                <label>Copyright</label>
                <p>The content of this site is copyright-protected and is the property of <strong>ZAID AKBAR</strong></p>
            </section>
        </div>
    )
}

export default Footer