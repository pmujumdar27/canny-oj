import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await authService.login(email, password)
				.then((res) => {
					if (res.data.status == 'failure' || res.status > 400) {
						alert(res.data.description);
					}
					else {
						localStorage.setItem("tokens", JSON.stringify(res.data));
						alert("Logged in!");
						navigate('/');
					}
				})
		}
		catch (err) {
			console.log(err.stack);
		}
	}
  
	return (
		<div>
			<form onSubmit={handleLogin}>
				<h3>Login</h3>
				<input
					type="text"
					placeholder='email'
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

export default Login