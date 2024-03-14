import axios from "../utils/axiosCustomize"

const postLogin = (email, password, delay) => {
    return axios.post(`api/v1/login`, {
        email,
        password,
        delay: 5000
    });
}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
}

const postLogout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, {
        email, refresh_token
    })
}

export {
    postLogin,
    postRegister,
    postLogout
}