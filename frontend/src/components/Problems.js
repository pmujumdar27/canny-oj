import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import problemService from '../services/problem-service';
import { Link } from 'react-router-dom';

const Problems = () => {
    const [problems, setProblems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        problemService.getProblems()
            .then((res) => {
                console.log("problems: ", res.data.data);
                setProblems(res.data.data);
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
            <h2> Problems </h2>
            {
                problems.map((prob, key) => {
                    return (
                        <div key={Math.random()}>
                            <Link to={`/problems/${prob.id}`}><h4>{prob.title}</h4></Link>
                        </div>
                    )
                })
            } 
        </div>
    )
}

export default Problems;