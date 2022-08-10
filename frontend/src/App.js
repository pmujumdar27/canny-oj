import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Private from "./components/Private";
import Signup from "./components/Signup";
import Problems from "./components/Problems";
import Problem from "./components/Problem";
import Submissions from "./components/Submissions";
import Submission from "./components/Submission";
import MyNavbar from "./components/MyNavbar";
import Navbar2 from "./components/Navbar2";
import ReduxTest from "./components/ReduxTest";

function App() {
	const [curUser, setCurUser] = useState("");
    useEffect(() => {
        const cu = localStorage.getItem("curUser");
        if(!cu){
            setCurUser(false);
        }
        else {
            setCurUser(JSON.parse(cu).data?.data?.username);
        }
        console.log("Cur User: ", curUser);
    }, [curUser]);

	return (
		<div className="App">
			<MyNavbar curUser={curUser}/>
			<div className="container mt-3">
				{/* <Navbar2></Navbar2> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/private" element={<Private />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route exact path="/problems" element={<Problems />} />
					<Route path="/problems/:id" element={<Problem />} />
					<Route exact path="/submissions" element={<Submissions />}/>
					<Route path="/submissions/:id" element={<Submission />}/>
					<Route path="/reduxtest" element={<ReduxTest />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
