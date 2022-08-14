import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSubmission } from '../features/submission/submissionActions';

const Submission = () => {
    let { id } = useParams();

    const { loading, submission, error, success } = useSelector(
        (state) => state.submission
    )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmission(id));
    }, [dispatch]);

    console.log("Sub: ", submission);
    
    return (
        <div>
            <h3> Submission </h3>
            {
                !loading && success && submission ? 
                <div>
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
                : 'Loading...'
            }
            
        </div>
    )
}

export default Submission