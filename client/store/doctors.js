import axios from 'axios';

const SET_DOCTOR = 'SET_DOCTOR';
const SET_DOCTOR_PATIENTS = 'SET_DOCTOR_PATIENTS';
const SET_DOCTOR_SINGLE_PATIENT = 'SET_DOCTOR_SINGLE_PATIENT';

const setDoctor = doctor => ({ type: SET_DOCTOR, doctor });
const setDoctorPatients = patients => ({ type: SET_DOCTOR_PATIENTS, patients });
const setDoctorSinglePatient = patient => ({
	type: SET_DOCTOR_SINGLE_PATIENT,
	patient
});

export const fetchDoctor = id => async dispatch => {
	try {
		const { data } = await axios.get(`/api/doctors/${id}`);
		dispatch(setDoctor(data || 'Doctor not found'));
	} catch (error) {
		throw new Error('Could not load doctor information');
	}
};
export const fetchDoctorPatients = id => async dispatch => {
	try {
		const { data } = await axios.get(`/api/doctors/${id}/patients`);
		dispatch(setDoctorPatients(data.patients || 'Patients not found'));
	} catch (error) {
		throw new Error('Could not load Patients');
	}
};
export const fetchDoctorSinglePatient = (id, patientId) => async dispatch => {
	try {
		const { data } = await axios.get(
			`/api/doctors/${id}/patients/${patientId}`
		);
		dispatch(setDoctorSinglePatient(data));
	} catch (error) {
		throw new Error('Patient not found');
	}
};

const initialState = {
	doctor: {},
	patients: [],
	currentPatient: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_DOCTOR:
			return { ...state, doctor: action.doctor };
		case SET_DOCTOR_PATIENTS:
			return { ...state, patient: action.patients };
		case SET_DOCTOR_SINGLE_PATIENT:
			return { ...state, currentPatient: action.patient };
		default:
			return state;
	}
}
