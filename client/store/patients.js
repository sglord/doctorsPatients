import axios from 'axios';

const SET_PATIENT = 'SET_PATIENT';

const setPatient = patient => ({
	type: SET_PATIENT,
	patient
});

export const fetchPatient = id => async dispatch => {
	const { data } = await axios.get(`/api/patients/${id}`);
	dispatch(setPatient(data));
};

// handle updating state to the updated patient
export const updatePatient = (id, updatedPatient) => async dispatch => {
	const { data } = await axios.put(`/api/patients/${id}`, updatePatient);
	dispatch(setPatient(data));
};

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_PATIENT:
			return action.patient;
		default:
			return state;
	}
}
