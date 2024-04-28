
import { useDispatch } from 'react-redux';
import { addAlertColorToStore, addAlertMessageToStore, addalertTypeToStore } from '../redux/Slices/alertSlice';

const useAlert = () => {
    const dispatch = useDispatch();

    const handleAlertClose = () => {
        dispatch(addalertTypeToStore(''));
        dispatch(addAlertMessageToStore(''));
        dispatch(addAlertColorToStore('white'));
    };

    const handleAlertOpen = (alertType, message, color) => {
        dispatch(addalertTypeToStore(alertType));
        dispatch(addAlertMessageToStore(message));
        dispatch(addAlertColorToStore(color));
    };

    return { handleAlertClose, handleAlertOpen };
};

export default useAlert;
