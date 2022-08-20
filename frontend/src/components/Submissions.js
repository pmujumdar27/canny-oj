import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../features/submissions/submissionsActions';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Submissions = () => {
    const { loading, submissions, response, error, success } = useSelector(
        (state) => state.submissions
    )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmissions());
    }, [dispatch]);

    console.log("Submissions: ", submissions);

    return (
        <div>
            <h2>Submissions</h2>
            {
                loading || !response ? 'Loading ...'
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> Submission ID</th>
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
                                            <td> {sub.id} </td>
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
                </Table>
            }
            
            
        </div>
    )
}

export default Submissions