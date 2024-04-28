import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import useAlert from "./useAlert";
import { useDispatch } from "react-redux";
import { removeUserFromStore } from "../redux/Slices/userSlice";


const useLogout = () => {
    const dispatch = useDispatch();
    const { handleAlertOpen, handleAlertClose } = useAlert()

    const logoutUser = async () => {
        try {
            await signOut(auth)
            localStorage.removeItem('token')
            dispatch(removeUserFromStore())
            handleAlertOpen('success', 'User logged out successfully', '#1fae15')

            setTimeout(() => {
                handleAlertClose()
            }, 5000)

        } catch (err) {
            console.log(err)
        }
    }

    return { logoutUser };
};

export default useLogout;
