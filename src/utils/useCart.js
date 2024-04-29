import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAlert from "./useAlert";


const useCart = (item) => {
    const [isInCart, setIsInCart] = useState(false);
    const isLoggedInUser = useSelector(store => store?.user?.user);
    const { handleAlertClose, handleAlertOpen } = useAlert();

    useEffect(() => {
        const existingCartlist = JSON.parse(localStorage.getItem('cartlist')) || [];
        setIsInCart(existingCartlist.some(cartlistItem => cartlistItem.id === item.id));
    }, [item?.id]);

    const addItemToCart = (e) => {
        e.stopPropagation();

        if (!isLoggedInUser) {
            handleAlertOpen('error', 'You have to login first.', 'red')

            setTimeout(() => {
                handleAlertClose()
            }, 5000)
            return;
        }

        const existingCartlistJSON = localStorage.getItem('cartlist') || '[]';
        const existingCartlist = JSON.parse(existingCartlistJSON);

        if (isInCart) {
            const updatedcartlist = existingCartlist.filter(cartlistItem => cartlistItem.id !== item?.id);
            localStorage.setItem('cartlist', JSON.stringify(updatedcartlist));
            setIsInCart(false);
            handleAlertOpen('success', 'Product removed from cart.', '#1fae15')
            setTimeout(() => {
                handleAlertClose()
            }, 5000)

        } else {
            const updatedcartlist = [...existingCartlist, item];
            localStorage.setItem('cartlist', JSON.stringify(updatedcartlist));
            setIsInCart(true);
            handleAlertOpen('success', 'Product added to cart.', '#1fae15')
            setTimeout(() => {
                handleAlertClose()
            }, 5000)
        }

       
    }


    return { addItemToCart, isInCart };
};

export default useCart;
