import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <div className="App">
			<Router>
				<h2>App</h2>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/login" element={<Login/>} />
					<Route exact path="/user-profile" element={<UserProfile/>} />
					<Route exact path="/signup" element={<Signup/>} />
				</Routes>
			</Router>
        </div>
    );
}

export default App;