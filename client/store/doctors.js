import axios from 'axios';

const SET_DOCTOR_PATIENTS = 'SET_DOCTOR_PATIENTS';

const setDoctorPatients = patients => ({ type: SET_DOCTOR_PATIENTS, patients });

export const fetchDoctorPatients = id => async dispatch => {
	try {
		const { data } = await axios.get(`/api/doctors/${id}/patients`);
		dispatch(setDoctorPatients(data || 'Patients not found'));
	} catch (error) {
		throw new Error('Could not load Patients');
	}
};

const initialState = {
	patients: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_DOCTOR_PATIENTS:
			return { ...state, patients: action.patients };
		default:
			return state;
	}
}
