import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../features/user/userActions';

const UserProfile = () => {
	const { userInfo, userToken } = useSelector(
		(state) => state.user
	)

	const dispatch = useDispatch();

	useEffect(() => {
		if (userToken) {
			dispatch(getUserDetails())
		}
	}, [userToken, dispatch]);

	console.log(userInfo);

	return (
		<div>
			<h2>User Profile</h2>
			<span>
				Welcome <strong>{userInfo?.data.username}</strong>
			</span>
			<br/>
			<span>
				Your registered email is: <strong>{userInfo?.data.email}</strong>
			</span>
		</div>
	)
}

export default UserProfile