import '../Product/Product.scss'
import React, { useEffect, useState } from 'react'
import { getProduct } from '../../utils/getProduct';
import { ShimmerSimpleGallery } from 'react-shimmer-effects';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import useWishlist from '../../utils/useWishlist';
import useCart from '../../utils/useCart';


const Product = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const { addItemToWishlist, isInWishlist } = useWishlist(product || {})
    const { addItemToCart, isInCart } = useCart(product || {})


    const fetchProduct = async () => {
        try {
            const productData = await getProduct(params.id);
            setProduct(productData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])



    return (
        <div className='product-container '>
            {isLoading ? <ShimmerSimpleGallery card imageHeight={200} caption /> : <div className='product'>
                <div className='product-image'>
                    <span className='img-1 '><img src={product.image} /></span>
                    <span className='img-2 '> <img className={``} src={product.image} /></span>
                </div>
                <div className='product-details '>
                    <span className='product-route'>Home / <strong className='route-pathname text-danger'>{product.category}</strong></span>
                    <span className='product-title'>{product.title}</span>
                    <span className='product-price'>${product.price}</span>
                    <span className='product-info'>Product Information</span>
                    <span className='product-desc pb-3 border-bottom mb-4'>{product.description}</span>
                    <div className='product-actions d-flex gap-3'>
                        {localStorage.getItem('token')
                            ? <>
                                {!isInWishlist
                                    ? <button onClick={(e) => { addItemToWishlist(e, product) }} className='w-100 btn btn-outline-dark rounded-0'> <FaHeart color='black' size='16px' className='me-2 icon' /> ADD TO FAVOURITES</button>
                                    : <button onClick={(e) => { addItemToWishlist(e, product) }} className='w-100 btn btn-outline-dark rounded-0'> <FaHeart color='red' size='16px' className='me-2 icon' /> REMOVE FROM FAVOURITES</button>
                                }

                                {!isInCart
                                    ? <button onClick={(e) => { addItemToCart(e, product) }} className='w-100 btn btn-outline-dark rounded-0'> <HiOutlineShoppingBag color='black' size='16px' className='me-2 icon' /> ADD TO BAG</button>
                                    : <button onClick={(e) => { navigate("/checkout/cart") }} className='w-100 btn btn-outline-dark rounded-0'> <HiOutlineShoppingBag color='black' size='16px' className='me-2 icon' /> GO TO BAG</button>
                                }
                            </>
                            : <span>
                                <p className='no-login-msg'>Sorry, you are not login !</p>
                                <p className='no-login-msg'>Please login to add product to cart or in you favourite list.</p>
                            </span>

                        }

                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Product