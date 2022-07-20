import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Private from "./components/Private";
import Signup from "./components/Signup";

function App() {
	const [currentUser, setCurrentUser] = useState(undefined);

	return (
		<div className="App">
			<h1>Hello from react</h1>

			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/private" element={<Private />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
