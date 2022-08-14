import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from '../features/user/userActions';

const RegisterUser = () => {
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (success) navigate('/login');
        if (userInfo) navigate('/user-profile');
    }, [navigate, userInfo, success]);

    const submitForm = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(registerUser(data));
    }

    return (
        <div>
            <div>
                Register
            </div>
            <hr></hr>
            { error && error.description }
            <div>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            {...register('username')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            {...register('email')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            {...register('password')}
                            required
                        />
                    </div>
                    <button type='submit' className='button' disabled={loading}>
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterUser;