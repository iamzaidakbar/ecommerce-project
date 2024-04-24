import React, { useEffect, useState } from 'react'
import '../Product/Product.scss'
import ReactImageZoom from 'react-image-zoom';
import { getProduct } from '../../utils/getProduct';
import { ShimmerSimpleGallery } from 'react-shimmer-effects';
import { useParams } from 'react-router-dom';


const Product = () => {
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    
    const props = { width: 700, height: 600, zoomWidth: 700, zoomPosition: 'right', offset: { vertical: 0, horizontal: 0 }, img: product?.image };

    const fetchProduct = async () => {
        try {
            const productData = await getProduct(params.id);
            setProduct(productData);
            setIsLoading(false);
        } catch (error) {
            // Handle error
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <div className='product-container container'>
            {isLoading ? <ShimmerSimpleGallery card imageHeight={200} caption /> : <div className='product d-flex gap-5'>
                <div className='product-image'>
                    <ReactImageZoom {...props} />
                </div>
                <div className='product-details '>
                    <span className='product-route'>Home / Women / Bracelet</span>
                    <span className='product-category'>{product.category}</span>
                    <span className='product-title'>{product.title}</span>
                    <span className='product-price'>${product.price}</span>
                    <span className='product-desc pb-3 border-bottom'>{product.description}</span>
                    <div className='product-actions d-flex gap-3'>
                        <input type='number' placeholder='Select ' className='form-control w-25 border-0 rounded-0 bg-white' />
                        <button className='w-100 btn btn-primary rounded-0'>ADD TO CART</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Product