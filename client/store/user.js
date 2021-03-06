import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
		const res = await axios.get('/auth/me');
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};
export const updateUser = (id, updatedUser) => async dispatch => {
	try {
		const { data } = await axios.put(`/api/patients/${id}`, updatedUser);
		dispatch(getUser(data));
	} catch (error) {
		throw new Error('Could not update');
	}
};
// method should be patient or doctors
export const auth = (email, password, method) => async dispatch => {
	let res;
	try {
		res = await axios.post(`/auth/login`, { email, password, method });
	} catch (authError) {
		return dispatch(getUser({ error: authError }));
	}

	try {
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
const defaultUser = {};

export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
