import React from 'react';
import submissionService from '../services/submission-service';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Submission = () => {
    const [submission, setSubmission] = useState("");

    let {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        submissionService.getSubmissionById(id)
            .then((res) => {
                console.log("submission: ", res.data.data);
                setSubmission(res.data.data);
            },
            (err) => {
                console.log("Error: ", err);
                if (err.response && err.response.status >= 400) {
                    alert("Invalid request or token");
                    navigate('/login');
                }
            })
    }, []);

    return (
        <div>
            <h3> Submission </h3>
            <p> Problem ID: {submission.problem_id} </p>
            <p> Submitted At: {submission.created_at}</p>
            <br/>
            <b> Status: {submission.status} </b>
            <hr/>
            <b> Code: </b>
            <br/>
            <hr/>
            <code>{submission.solution_code} </code>
            <hr/>
        </div>
    )
}

export default Submission;