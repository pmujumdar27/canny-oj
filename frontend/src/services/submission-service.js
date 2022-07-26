import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/submissions"

const getSubmissions = () => {
    const auth_headers = authHeader();
    return axios.get(API_URL, { headers: auth_headers });
}

const getSubmissionById = (id) => {
    const auth_headers = authHeader();
    return axios.get(API_URL + "/" + id, { headers: auth_headers });
}

const addSubmission = (payload) => {
    const auth_headers = authHeader();
    const headers = {
        ...auth_headers,
        'Content-type': 'multipart/form-data'
    }
    return axios.post(
        API_URL + "/submit",
        payload,
        { headers: headers }
    )
}

const submissionService = {
    getSubmissions,
    getSubmissionById,
    addSubmission
};

export default submissionService;