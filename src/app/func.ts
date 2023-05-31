import {loginFailed, loginRequest, loginSucceed, logout} from "../features/auth/auth-slice";
import {signupRequest, signupFailed} from "../features/auth/signup-slice";
import {getUserDataFailed, getUserDataRequest, getUserDataSucceed} from "../features/user/user-slice";
import {EditUserFunc, GetUserDataFunc, LogUserInFunc, LogUserOutFunc, SignUpUserFunc} from "./func-types";
import {getCollectionsFailed, getCollectionsRequest, getCollectionsSucceed, postCollectionFailed, postCollectionRequest, postCollectionSucceed
} from "../features/collections/collections-slice";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

export const logUserIn: LogUserInFunc = ({email, password}, dispatch, keepLoggedIn) => {
    dispatch(loginRequest());

    const uri = `${import.meta.env.VITE_API_URL}/user/login`;

    const myHeaders = new Headers({
        "Content-Type": "application/json"
    });

    const raw = JSON.stringify({
        email: email,
        password: password
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(result => {
            const {token} = result.body;
            if (token) {
                if (keepLoggedIn) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }

                dispatch(loginSucceed({token}));
            } else {
                dispatch(loginFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(loginFailed(error.message));
        })
}
export const logUserOut: LogUserOutFunc = (dispatch) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logout());
}
export const signUpUser: SignUpUserFunc = ({email, password, username}, dispatch) => {
    dispatch(signupRequest());

    const uri = `${import.meta.env.VITE_API_URL}/user/signup`;

    const myHeaders = new Headers({
        "Content-Type": "application/json"
    })

    const raw = JSON.stringify({
        email: email,
        password: password,
        username: username
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(result => {
            const {token} = result.body;
            if (token) {
                dispatch(loginSucceed({token}));
            } else {
                dispatch(signupFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(signupFailed(error.message));
        })
}
export const getUserData: GetUserDataFunc = (token, dispatch) => {
    dispatch(getUserDataRequest());

    const uri = `${import.meta.env.VITE_API_URL}/user/profile`;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                dispatch(getUserDataFailed("Could not get user data, please try again later"));
            }
        })
        .then(result => {
            if (result.body) {
                const {firstName, lastName, email, username, bio, profilePictureUrl, socials} = result.body;

                dispatch(getUserDataSucceed({
                    email,
                    firstName,
                    lastName,
                    username,
                    bio,
                    profilePictureUrl,
                    socials
                }));
            } else {
                dispatch(getUserDataFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailed(error.message));
        })
}
export const editUserData: EditUserFunc = (data, dispatch, resolveCallback) => {
    const uri = `${import.meta.env.VITE_API_URL}/user/profile`;
    const token = localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? null;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const raw = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName
    });

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.body) {
                const {firstName, lastName, email, username, bio, profilePictureUrl, socials} = result.body;

                dispatch(getUserDataSucceed({
                    email,
                    firstName,
                    lastName,
                    username,
                    bio,
                    profilePictureUrl,
                    socials
                }));

                resolveCallback();
            } else {
                dispatch(getUserDataFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailed(error));
        })
}
export const getCollections = (token: string, dispatch: (arg0: any) => void, limit = 10, page = 1) => {
    dispatch(getCollectionsRequest());
    const uri = `${import.meta.env.VITE_API_URL}/user/collections/${page}/${limit}`;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => {
            if (response.status === 401) {
                logUserOut(dispatch as Dispatch<AnyAction>);
            }

            return response.json();
        })
        .then(result => {
            if (result.body) {
                const data = result.body;

                dispatch(getCollectionsSucceed(data));
            } else {
                dispatch(getCollectionsFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(getCollectionsFailed(error));
        })
}
export const postCollection = (token: string, dispatch: any, collectionData: any, resolveCallback: any) => {
    dispatch(postCollectionRequest());
    const uri = `${import.meta.env.VITE_API_URL}/user/collections`;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(collectionData)
    };

    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.body) {
                const data = result.body;
                dispatch(postCollectionSucceed(data));
                resolveCallback();
            } else {
                dispatch(postCollectionFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(postCollectionFailed(error));
        })
}
