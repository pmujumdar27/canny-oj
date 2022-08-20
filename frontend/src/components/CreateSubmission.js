import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSubmission } from '../features/submissions/submissionsActions';

const CreateSubmission = (id) => {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitForm = (data) => {
        const payload = {
            submission_file: data.file[0],
            problem_id: id.id,
            language: data.language
        }
        console.log("Payload: ", payload);
        dispatch(createSubmission(payload));
        navigate('/submissions');
    }

    return (
        <div>
            CreateSubmission
            <hr/>
            <form onSubmit={handleSubmit(submitForm)}>
                <label htmlFor='language'>language</label>
                <select
                    {...register('language')}
                    required
                >
                    <option value="Cpp">C++</option>
                    <option value="python">Python</option>
                </select>
                <input
                    {...register('file')}
                    name='file'
                    type='file'
                    required
                />
                <button type='submit' className='button'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateSubmission;