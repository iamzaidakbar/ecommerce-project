
import { useDispatch, useSelector } from 'react-redux';
import { addAlertColorToStore, addAlertMessageToStore, addalertTypeToStore } from '../redux/Slices/alertSlice';
import { useEffect, useState } from 'react';
import useAlert from './useAlert';

const useWishlist = (item) => {
    const dispatch = useDispatch();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const isLoggedInUser = useSelector(store => store?.user?.user);
    const { handleAlertClose, handleAlertOpen } = useAlert();

    useEffect(() => {
        const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsInWishlist(existingWishlist.some(wishlistItem => wishlistItem.id === item.id));
    }, [item.id]);

    const addItemToWishlist = (e,item) => {
        e.stopPropagation();

        if (!isLoggedInUser) {
            dispatch(addalertTypeToStore('error'))
            dispatch(addAlertMessageToStore('You have to login first.'))
            dispatch(addAlertColorToStore('red'))

            setTimeout(() => {
                dispatch(addalertTypeToStore(''))
                dispatch(addAlertMessageToStore(''))
                dispatch(addAlertColorToStore('black'))
            }, 5000)

            return;
        }

        const existingWishlistJSON = localStorage.getItem('wishlist') || '[]';
        const existingWishlist = JSON.parse(existingWishlistJSON);

        if (isInWishlist) {
            const updatedWishlist = existingWishlist.filter(wishlistItem => wishlistItem.id !== item.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(false);
            handleAlertOpen('success', 'Product removed from favourites.', '#1fae15')
            setTimeout(() => {
                handleAlertClose()
            }, 5000)

        } else {
            const updatedWishlist = [...existingWishlist, item];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(true);
            handleAlertOpen('success', 'Product added to favourites.', '#1fae15')
            setTimeout(() => {
                handleAlertClose()
            }, 5000)
        }
    }

    return { addItemToWishlist, isInWishlist };
};

export default useWishlist;
