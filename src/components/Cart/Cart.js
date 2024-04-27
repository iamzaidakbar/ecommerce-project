import "./Cart.scss"

import React, { useEffect, useState } from 'react';
import NoResults from "../NoResults/NoResults";
import Cartlist from "../Cartlist/Cartlist";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

    const title_1 = "SAVE YOUR CART ITEMS"
    const title_2 = "Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here. Browse now"

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsLoading(true);
            const cartFromStorage = JSON.parse(localStorage.getItem("cartlist")) || [];
            setCart(cartFromStorage);
            setIsLoading(false);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cart">
            <h2 className="title">Shopping Bag</h2>
            <p className="lead">Showing {cart?.length} Items</p>

            {cart && cart.length > 0 ? (
                <Cartlist products={cart} isLoading={isLoading} />
            ) : (
                <NoResults title_1={title_1} title_2={title_2} route={'/store'} />
            )}
        </div>
    );
};

export default Cart;
