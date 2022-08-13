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
					<Route exact path="/signup" element={<Signup/>} />
					<Route exact path="/problems" element={<Problems />} />
				</Routes>
			</Router>
        </div>
    );
}

export default App;