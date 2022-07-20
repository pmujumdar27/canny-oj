import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.signup(username, email, password)
                                .then((res) => {
                                    if (res.data.status == 'failure' || res.status == 400) {
                                        alert(res.data.description);
                                    }
                                    else {
                                        alert("Signup successful, you may now login!")
                                        navigate("/login");
                                    }
                                })
        }
        catch (err) {
            console.log(err.stack);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <h3>Sign up</h3>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup