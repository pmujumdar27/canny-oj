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

	console.log("UserToken: ", userToken);
	console.log("UserInfo: ", userInfo);

	return (
		<div>
			<h2>User Profile</h2>
			<div>
				{userInfo? `Logged in as ${userInfo.data.username}` : 'Not Logged In!'}
			</div>
		</div>
	)
}

export default UserProfile