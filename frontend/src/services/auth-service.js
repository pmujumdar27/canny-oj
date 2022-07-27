import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/users";

const signup = (username, email, password) => {
    return axios
        .post(API_URL + "/signup", {
            username,
            email,
            password
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response
        })
};

const getUser = () => {
    return axios
        .get(API_URL, { headers: authHeader() })
}

const login = (email, password) => {
    return axios
        .post(API_URL + "/login", {
            email,
            password
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response
        })
}

const authService = {
    signup,
    login,
    getUser
};

export default authService;