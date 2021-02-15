import React from "react"
import { navigate } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from "../utils/auth"
import initFirebase from "./firebaseObj";

const firebase = initFirebase();

const Login = () => {

    if (isLoggedIn()) {
        navigate(`/app/profile`)
    }

    function getUiConfig(auth) {
        return {
            signInFlow: 'popup',
            signInOptions: [
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    setUser(result.user);
                    navigate('/app/profile');
                }
            }
        };
    }

    return (
        <React.Fragment>
            <p>Please sign-in to access to the private route:</p>
            {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
        </React.Fragment>
    );

}

export default Login