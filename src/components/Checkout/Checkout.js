import "./Checkout.scss"

import React from 'react'
import Cart from '../Cart/Cart';
import { useLocation } from "react-router-dom";
import Address from "../Address/Address";

const Checkout = () => {
    const location = useLocation()
    const pathname = location.pathname.replace(/\//g, '_')


    return (
        <div className="checkout">

            <section className={`checkout_steps ${pathname}`}>
                <span className="bag">BAG</span>
                <span>- - - - - - -</span>
                <span className="address">ADDRESS</span>
                <span>- - - - - - -</span>
                <span className="payment">PAYMENT</span>
            </section>

            <section className="dynamic_outlet_section">
                {pathname === "_checkout_cart" && <Cart />}
                {pathname === "_checkout_address" && <Address />}
            </section>
        </div>
    )
}

export default Checkout