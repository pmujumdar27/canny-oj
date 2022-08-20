import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProblems } from '../features/problems/problemsActions';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CreateProblem from './CreateProblem';


const Problems = () => {
    const { loading, problems, response, error, success } = useSelector(
        (state) => state.problems
    )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProblems());
    }, [dispatch]);

    return (
        <div>
            <h2> Problems </h2>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        problems.map((prob, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <Link to={`/problems/${prob.id}`}>{prob.title}</Link>
                                    </td>
                                    <td>{prob.author}</td>
                                    <td>{prob.created_at}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Problems