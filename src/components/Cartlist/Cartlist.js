import React, { useEffect, useState } from 'react';
import { ShimmerContentBlock, ShimmerPostItem } from "react-shimmer-effects";
import { RiDeleteBin6Line } from "react-icons/ri";
import paymentGateway from "../../assets/payment-gateway.jpg"
import "./Cartlist.scss";
import CustomModal from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cartlist = ({ products, isLoading }) => {
    const navigate = useNavigate();
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const discountApplied = useSelector(store => store?.discount?.discount_applied)

    const removeItemFromCart = (item) => {
        const updatedCartlist = updatedProducts.filter(cartItem => cartItem.id !== item.id);
        localStorage.setItem('cartlist', JSON.stringify(updatedCartlist));
        setUpdatedProducts(updatedCartlist)
    }

    const updateQuantityOfProduct = (item, quantity) => {
        const updatedProductsCopy = updatedProducts.map(product => {
            if (product.id === item.id) {
                return {
                    ...product,
                    quantity: quantity
                };
            }
            return product;
        });
        setUpdatedProducts(updatedProductsCopy);
        countTotalPrice();
    }

    const countTotalPrice = (discount = 0) => {
        const totalPrice = updatedProducts.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        const discountedPrice = totalPrice * (1 - discount / 100);
        setTotalPrice(parseFloat(discountedPrice.toFixed(2)));
    }

    useEffect(() => {
        setUpdatedProducts(addItemCountToProducts(products));
    }, []);

    useEffect(() => {
        countTotalPrice(discountApplied);
    }, [updatedProducts, discountApplied])

    const addItemCountToProducts = (products) => {
        return products.map(product => ({
            ...product,
            quantity: 1
        }));
    }

    return (
        <div className="container cartlist d-flex gap-5 p-5 mt-4">
            <section className="cart-products">
                {
                    isLoading || updatedProducts.length === 0
                        ? <ShimmerContentBlock
                            title
                            text
                            cta
                            thumbnailWidth={140}
                            className="shimmer"
                        />
                        : updatedProducts.map((item, index) => (
                            <div className={`cart-item d-flex align-items-start gap-4 mb-4 pb-4 ${index !== updatedProducts.length - 1 && 'border-bottom'}`} key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <span className="cart-product-details">
                                    <p onClick={() => { navigate('/product/' + item.id) }} className='product-title'>{item.title}</p>
                                    <p className='product product-price'>${item.price}</p>
                                    <p className={`product product-rating py-2`}>Rating : {item.rating.rate}</p>
                                    <p className='product product-category mb-4'>{item.category}</p>
                                    <select id='quantity' name='number' onChange={(e) => updateQuantityOfProduct(item, e.target.value)}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                    </select>

                                </span>
                                <RiDeleteBin6Line onClick={() => removeItemFromCart(item)} className='icon' size={'20px'} color='black' />
                            </div>
                        ))
                }
            </section>
            <section className="cart-checkout">
                {
                    isLoading || updatedProducts.length === 0
                        ? <ShimmerPostItem
                            card
                            title
                            cta
                            imageWidth={80}
                            imageHeight={80} />
                        : <div className='checkout-wrapper'>
                            <span className='discounts pb-3 mb-2 border-bottom d-flex align-items-center justify-content-between'>
                                <p className='m-0'>Discounts</p>
                                {discountApplied
                                    ? <span>{'Applied'}</span>
                                    : <span onClick={() => { setShowDiscountModal(true) }}>{'Apply discount'}</span>}
                            </span>
                            <span className='order-value mb-1 d-flex align-items-center justify-content-between'>
                                <p className='m-0'>Order value</p>
                                <span className='m-0'>${totalPrice}</span>
                            </span>
                            <span className='delivery-charges pb-3 mb-2 d-flex align-items-center justify-content-between'>
                                <p className='m-0'>Delivery</p>
                                <span className='m-0'>Free</span>
                            </span>
                            <span className='total-price d-flex align-items-center justify-content-between'>
                                <p className='m-0'>Total</p>
                                <span className='m-0'>${totalPrice}</span>
                            </span>
                            <button className='btn rounded-0 border-0 w-100 mt-5'>Continue to Checkout</button>
                            <p className='pt-3 m-0 lead'>We accept</p>
                            <p className='pt-1 m-0 lead'>Cash on Delivery</p>
                            <img loading='lazy' src={paymentGateway} className='payment-gateway-img pt-2' />
                            <p className='mt-2 notice'>Prices and delivery costs are not confirmed until you've reached the checkout.</p>
                        </div>
                }
            </section>
            <CustomModal
                isOpen={showDiscountModal}
                onRequestClose={() => setShowDiscountModal(false)}
            />
        </div>
    )
}

export default Cartlist;
