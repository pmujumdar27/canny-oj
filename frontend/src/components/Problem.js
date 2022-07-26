import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import problemService from '../services/problem-service';
import { useNavigate } from 'react-router-dom';
import submissionService from '../services/submission-service';

const Problem = () => {

    let {id} = useParams();
    
    const [problem, setProblem] = useState([]);
    const [file, setFile] = useState(undefined);
    const [language, setLanguage] = useState("Cpp");

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('submission_file', file);
        formData.append('language', language);
        formData.append('problem_id', id);
        submissionService.addSubmission(formData)
            .then((res) => {
                console.log("Done: ", res);
            },
            (err) => {
                console.log("Error: ", err);
            })
    }

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
            <hr/>
            <form onSubmit={handleSubmit}>
                <p>Submit</p>
                <label htmlFor="language">Language</label>
                <select id="cars" name="cars" onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Cpp">C++</option>
                    <option value="python">Python</option>
                </select>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default Problem;