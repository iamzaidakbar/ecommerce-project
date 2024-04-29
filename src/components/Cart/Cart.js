import "./Cart.scss"

import React, { useEffect, useState } from 'react';
import NoResults from "../NoResults/NoResults";
import Cartlist from "../Cartlist/Cartlist";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

    const title_1 = "SAVE YOUR CART ITEMS"
    const title_2 = "Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here. Browse now"

    const title_3 = 'SORRY, YOU ARE NOT LOGGED IN.'
    const title_4 = "Want to see the items that you love? Just login on the user symbol above and it will show up here. THANK YOU."

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
            <p className="lead">Showing {localStorage.getItem('token') ? cart?.length : 0} Items</p>

            {
                localStorage.getItem('token')
                    ? cart && cart.length > 0 ? (
                        <Cartlist products={cart} isLoading={isLoading} />
                    ) : (
                        <NoResults title_1={title_1} title_2={title_2} route={'/store'} />
                    )
                    : <NoResults title_1={title_3} title_2={title_4} route={'/store'} />
            }


        </div>
    );
};

export default Cart;
