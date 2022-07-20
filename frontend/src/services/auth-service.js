import axios from "axios";

const API_URL = "http://localhost:8000/users";

const signup = async (username, email, password) => {
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

const login = async (email, password) => {
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
    login
};

export default authService;