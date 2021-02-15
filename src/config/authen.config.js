export function getAuthenUiConfig(firebaseInstance) {
    console.log(firebaseInstance);

    return {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebaseInstance.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: authResult => {

            }
        }
    };
}