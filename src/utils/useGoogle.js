import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import useAlert from "./useAlert";
import { addUserToStore } from "../redux/Slices/userSlice";
import { useDispatch } from "react-redux";

const useGoogle = () => {
    const dispatch = useDispatch();
    const { handleAlertClose, handleAlertOpen } = useAlert();

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userData = userCredential.user;

            localStorage.setItem('token', userData.accessToken)

            const dataToDispatch = {
                username: userData.displayName,
                email: userData.email,
                uid: userData.uid,
                profile: userData.photoURL,
                isLoggedIn: true,
            }

            dispatch(addUserToStore(dataToDispatch))
            handleAlertOpen('success', 'User logged in successfully', '#1fae15');

            setTimeout(() => {
                handleAlertClose()
            }, 5000)

        } catch (error) {
            console.error(error);
        }
    };

    return { signInWithGoogle };
};

export default useGoogle;
