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

const postUpdateProfile = (userName, image) => {
    const data = new FormData();
    data.append('username', userName);
    data.append('userImage', image);
    return axios.post('api/v1/profile', data);
}

const postChangePassword = (current_password, new_password) => {
    return axios.post(`api/v1/change-password`, {
        current_password,
        new_password
    });
}

export {
    postLogin,
    postRegister,
    postLogout,
    postUpdateProfile,
    postChangePassword
}