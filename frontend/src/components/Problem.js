import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProblem } from '../features/problem/problemActions';
import CreateSubmission from './CreateSubmission';

const Problem = () => {
    let { id } = useParams();

    const { loading, problem, error, success } = useSelector(
        (state) => state.problem
    )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProblem(id));
    }, [dispatch]);
    
    return (
        <div>
            <h2>Problem </h2>
            {
                loading || !problem ? 'loading' : 
                <div>
                    <h3>{problem.data.title} </h3>
                    <hr/>
                    {problem.data.author}
                    <hr/>
                    <br/>
                    <p>{problem.data.statement}</p>
                    <h5>Sample Input</h5>
                    {problem.data.sample_input}
                    <h5>Sample Output</h5>
                    {problem.data.sample_output}
                    <hr/>
                </div>
            }
            <CreateSubmission id={id}/>
        </div>
    )
}

export default Problem