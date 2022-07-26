import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submissionService from '../services/submission-service';
import { Link } from 'react-router-dom';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        submissionService.getSubmissions()
            .then((res) => {
                console.log("Submissions: ", res.data.data);
                setSubmissions(res.data.data);
            },
            (err) => {
                console.log("Error: ", err);
                if (err.response && err.response.status == 401) {
                    alert("Invalid JWT token!");
                    navigate("/login");
                }
            })
    }, []);

    return (
        <div>
            <h2> Submission </h2>
            <table>
                <thead>
                    <tr>
                        <th> User ID </th>
                        <th> Problem ID</th>
                        <th> Language </th>
                        <th> Status </th>
                        <th> Submitted At </th>
                        <th> Details </th>
                    </tr>
                </thead>
                <tbody>
                        {
                                submissions.map((sub, key) => {
                                    return (
                                        <tr key={Math.random()}>
                                            <td> {sub.user_id} </td>
                                            <td> {sub.problem_id} </td>
                                            <td> {sub.language} </td>
                                            <td> {sub.status} </td>
                                            <td> {sub.created_at} </td>
                                            <td> <Link to={`/submissions/${sub.id}`}> Code </Link></td>
                                        </tr>
                                    )
                                })
                        }
                </tbody>
            </table>
        </div>
    )
}

export default Submissions;