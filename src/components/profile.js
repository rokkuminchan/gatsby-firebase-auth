import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import { getUserInfo, saveUserInfo } from "../api/userInfo";
import { getUser } from "../utils/auth"


const Profile = () => {
    const [userInfo, setUserInfo] = useState();
    const user = getUser();
    const { displayName, email, emailVerified } = user;
    const accessToken = user.stsTokenManager.accessToken;

    useEffect(() => {
        const history = {
            uid: uuidv4()
        };

        async function fetchMyAPI() {
            var result = await getUserInfo();

            if (!result) {
                result = history;

                saveUserInfo(history);
            }

            setUserInfo(JSON.stringify(result));
        }

        fetchMyAPI();
    }, []);

    return <main>
        <h3>Learning progress</h3>
        <input type="button" value="Progress" />
        <br />
        {userInfo}
    </main>
}

export default Profile