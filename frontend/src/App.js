import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import MyNavbar from './components/MyNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import Problems from './components/Problems';
import Submissions from './components/Submissions';
import Problem from './components/Problem';
import Submission from './components/Submission';
import CreateProblem from './components/CreateProblem';

function App() {
    return (
        <div className="App">
			<Router>
				<MyNavbar />
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/login" element={<Login/>} />
					<Route element={<ProtectedRoute />}>
						<Route exact path="/user-profile" element={<UserProfile/>} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route exact path="/submissions" element={<Submissions/>} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/submissions/:id" element={<Submission/>} />
					</Route>
					<Route exact path="/signup" element={<Signup/>} />
					<Route exact path="/problems" element={<Problems />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/problems/:id" element={<Problem />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route exact path="/problems/create" element={<CreateProblem />} />
					</Route>
				</Routes>
			</Router>
        </div>
    );
}

export default App;