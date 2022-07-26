import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Private from "./components/Private";
import Signup from "./components/Signup";
import Problems from "./components/Problems";
import Problem from "./components/Problem";

function Test() {
	let {id} = useParams();
	return (
		<div>
			Test: {id}
		</div>
	)
}

function App() {
	const [currentUser, setCurrentUser] = useState(undefined);

	return (
		<div className="App">
			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/private" element={<Private />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route exact path="/problems" element={<Problems />} />
					<Route path="/problems/:id" element={<Problem />} />
					<Route path="/test/:id" element={<Test/>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
