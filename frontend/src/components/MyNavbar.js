import React, { useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/user/userActions';
import { logout } from '../features/user/userSlice';

const MyNavbar = () => {
	const { userInfo, userToken } = useSelector(
		(state) => state.user
	)

	const dispatch = useDispatch();

	useEffect(() => {
		if (userToken) {
			dispatch(getUserDetails());
		}
	}, [userToken, dispatch]);

    return (
     	<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href='/'>CannyOJ</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/'>Home</Nav.Link>
					<NavDropdown title='Problems'>
						<NavDropdown.Item href='/problems'>Problem List</NavDropdown.Item>
						<NavDropdown.Item href='/problems/create'>Create New Problem</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link href='/submissions'>Submissions</Nav.Link>
					<Nav.Link href='#about'>About</Nav.Link>
					{ userInfo && userToken ? 
					<NavDropdown title={userInfo.data.username}>
						<NavDropdown.Item href='/user-profile'>My Profile</NavDropdown.Item>
						<NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
					</NavDropdown>
					:
					<Nav.Link href='/login'>Login</Nav.Link>
					}
					{ !(userInfo && userToken ) ?
					<Nav.Link href='/signup'>Register</Nav.Link>
					:
					<></>
					}
				</Nav>
			</Container>
		</Navbar>
    )
}

export default MyNavbar;