import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/problems"

const getProblems = async () => {
    const auth_headers = authHeader();
    return axios.get(API_URL, { headers: auth_headers });
};

const getProblemById = async (id) => {
    const auth_headers = authHeader();
    return axios.get(API_URL + "/" +id, { headers: auth_headers });
}

const problemService = {
    getProblems,
    getProblemById
};

export default problemService;