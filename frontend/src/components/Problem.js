import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import problemService from '../services/problem-service';
import { useNavigate } from 'react-router-dom';

const Problem = () => {

    let {id} = useParams();
    
    const [problem, setProblem] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        problemService.getProblemById(id)
            .then((res) => {
                console.log("Cur Prob: ", res.data.data);
                setProblem(res.data.data);
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
            <h2> Problem </h2>
            <h3> {problem.title} </h3>
            <hr/>
            {problem.author}
            <hr/>
            <br/>
            <p>{problem.statement}</p>
            <h5>Sample Input</h5>
            {problem.sample_input}
            <h5>Sample Output</h5>
            {problem.sample_output}
        </div>
    )
}

export default Problem;