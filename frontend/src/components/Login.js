import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';
import Button from 'react-bootstrap/Button';

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
						authService.getUser()
							.then((userdata) => {
								if(userdata) {
									localStorage.setItem('curUser', JSON.stringify(userdata));
								}
							})
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
                <Button variant="primary" type="submit">Login</Button>
			</form>
		</div>
	)
}

export default Login