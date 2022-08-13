import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../features/user/userActions';

const Login = () => {
    const { loading, userInfo, error } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (userInfo?.status === "success") navigate('/user-profile');
    }, [navigate, userInfo]);

    const submitForm = (data) => {
        data.email = data.email.toLowerCase();
        dispatch(userLogin(data));
    }

    return (
        <div>
            <div>
                Login
            </div>
            <hr></hr>
            { error && error.description }
            <div>
                <form onSubmit={handleSubmit(submitForm)}>
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;