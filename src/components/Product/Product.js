import '../Product/Product.scss'
import React, { useEffect, useState } from 'react'
import { getProduct } from '../../utils/getProduct';
import { ShimmerSimpleGallery } from 'react-shimmer-effects';
import { useParams } from 'react-router-dom';


const Product = () => {
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true);


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
                    <span className='product-route'>Home / Women / Bracelet</span>
                    <span className='product-category'>{product.category}</span>
                    <span className='product-title'>{product.title}</span>
                    <span className='product-price'>${product.price}</span>
                    <span className='product-info'>Product Information</span>
                    <span className='product-desc pb-3 border-bottom mb-4'>{product.description}</span>
                    <div className='product-actions d-flex gap-3'>
                        <button className='w-100 btn btn-outline-dark rounded-0'>ADD TO WISHLIST</button>
                        <button className='w-100 btn btn-outline-dark rounded-0'>ADD TO BAG</button>
                        <button className='w-100 btn btn-outline-dark rounded-0'>GO TO BAG</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Product