import { authActions } from "./authSlice";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const validate = ({ user }) => {
    return async (dispatch) => {
        try {
            dispatch(
              authActions.validate({
                  displayName: user.displayName,
                  emailAddress: user.email
              })
            );
        } catch (error) {
        }
    };
};

export const authenticateGoogle = () => {
    return async (dispatch) => {
        const authenticateGoogleData = async () => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            return await signInWithPopup(auth, provider);
        };

        try {
            const authData = await authenticateGoogleData();
            dispatch(
              authActions.authenticate({
                  displayName: authData.user.displayName,
                  emailAddress: authData.user.email
              })
            );
        } catch (error) {
        }
    };
};

export const authenticateBasic = ({ email, password }) => {
    return async (dispatch) => {
        const authenticateBasicData = async () => {
            const auth = getAuth();
            return await signInWithEmailAndPassword(auth, email, password);
        };

        try {
            const authData = await authenticateBasicData();
            dispatch(
              authActions.authenticate({
                  emailAddress: authData.user.email
              })
            );
        } catch (error) {
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        try {
            dispatch(
              authActions.logout()
            );
            localStorage.removeItem("access_token");
        } catch (error) {
            throw new Error("Unable to delete token");
        }
    };
};
