import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Modal, Segment, Grid, Form, Button, Divider } from 'semantic-ui-react';
/**
 * COMPONENT
 */
class AuthForm extends Component {
	state = {
		open: false
	};

	render() {
		const { name, handleSubmit, error } = this.props;

		return (
			<Segment placeholder>
				<Grid relaxed="very" stackable>
					<Grid.Column>
						<Form name={name} onSubmit={handleSubmit}>
							<Form.Input
								icon="user"
								iconPosition="left"
								label="Email"
								placeholder="Email"
								name="email"
							/>
							<Form.Input
								icon="lock"
								iconPosition="left"
								label="Password"
								type="password"
								name="password"
							/>

							<Button content="Login" primary type="submit" />
						</Form>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapDoctorLogin = state => {
	return {
		name: 'doctors',
		displayName: 'Doctor LogIn',
		error: state.user.error
	};
};

const mapPatientLogin = state => {
	return {
		name: 'patients',
		displayName: 'Patient LogIn',
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(auth(email, password, formName));
		}
	};
};

export const DoctorLogin = connect(mapDoctorLogin, mapDispatch)(AuthForm);
export const PatientLogin = connect(mapPatientLogin, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
