import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/problems"

const getProblems = () => {
    const auth_headers = authHeader();
    return axios.get(API_URL, { headers: auth_headers });
};

const getProblemById = (id) => {
    const auth_headers = authHeader();
    return axios.get(API_URL + "/" +id, { headers: auth_headers });
}

const addProblem = async (id) => {
    return "";
}

const problemService = {
    getProblems,
    getProblemById
};

export default problemService;