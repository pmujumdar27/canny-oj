import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/actions';

const ReduxTest = () => {
    const counter = useSelector(state => state.counter);
    const logged = useSelector(state => state.logged);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Redux Test</h1>

            <h3>Counter {counter}</h3>
            <
                button
                onClick={() => dispatch(increment())}
            >
            +
            </button>
            <
            button
                onClick={() => dispatch(decrement())}
            >
            -
            </button>
            {logged? <h3>Protected info</h3> : <h3>Login to view</h3>}
        </div>
    )
}

export default ReduxTest;