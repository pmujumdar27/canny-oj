import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProblem } from '../features/problems/problemsActions';

const CreateProblem = () => {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const submitForm = (data) => {
        const payload = {
            title: data.title,
            statement: data.statement,
            sample_input: data.sample_input,
            sample_output: data.sample_output,
            test_input: data.test_input[0],
            test_output: data.test_output[0]
        }
        dispatch(createProblem(payload));
    }

    return (
        <div>
            <h2>
                Create New Problem
            </h2>
            <hr/>
            <form onSubmit={handleSubmit(submitForm)}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        {...register('title')}
                        name='title'
                        type='text'
                        required
                    />
                </div>
                <hr/>
                <div>
                    <label htmlFor='statement'>Problem Statement</label>
                    <input
                        {...register('statement')}
                        name='statement'
                        type='text'
                        required
                    />
                </div>
                <hr />
                <div>
                    <label htmlFor='sample_input'>Sample Input</label>
                    <input
                        {...register('sample_input')}
                        name='sample_input'
                        type='text'
                        required
                    />
                </div>
                <hr />
                <div>
                    <label htmlFor='sample_output'>Sample Output</label>
                    <input
                        {...register('sample_output')}
                        name='sample_output'
                        type='text'
                        required
                    />
                </div>
                <hr />
                <div>
                    <label htmlFor='test_input'>Test Input</label>
                    <input
                        {...register('test_input')}
                        name='test_input'
                        type='file'
                        required
                    />
                </div>
                <hr />
                <div>
                    <label htmlFor='test_output'>Test Output</label>
                    <input
                        {...register('test_output')}
                        name='test_output'
                        type='file'
                        required
                    />
                </div>
                <hr />
                <div>
                    <button type='submit' className='button'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProblem