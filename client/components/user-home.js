import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Divider, Icon, Container } from 'semantic-ui-react';

import UserInfo from './UserInfo';
import { updatePatient } from '../store/patients';
// DOCTORS
// doctors/patients
// home page should show info and list of all of their patients
// // // ** steal component from grace shopper
// doctors/singlePatients
// should display singlePatient information

//USERS
// shoudl displys user info
// should be able to modify info
// reuse patient components

/**
 * COMPONENT
 */
// export const UserHome = props => {
class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			address: this.props.user.address,
			email: this.props.user.email,
			phone: this.props.user.phone,
			age: this.props.user.age,
			editForm: true
		};

		this._onChange = this._onChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.userInfoEditHandler = this.userInfoEditHandler.bind(this);
		this.userInfoSaveHandler = this.userInfoSaveHandler.bind(this);
	}
	_onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	_onSubmit = event => {
		event.preventDefault();
		const id = this.props.user.id;
		const updatedPatientInfo = this.state;
		this.props.updatePatient(id, updatedPatientInfo);
	};

	userInfoEditHandler() {
		if (this.state.editForm === true) {
			this.setState({ editForm: false });
		} else if (this.state.editForm === false) {
			this.setState({ editForm: true });
		}
	}
	userInfoSaveHandler() {
		event.preventDefault();
		if (this.state.editForm === true) {
			this.setState({ editForm: false });
		} else if (this.state.editForm === false) {
			this.setState({ editForm: true });
		}
		const id = this.props.user.id;
		const updatedPatientInfo = this.state;
		this.props.updatePatient(id, updatedPatientInfo);
	}

	render() {
		const { user } = this.props;

		return (
			<div>
				<Header as="h2">Welcome</Header>
				<Divider fitted />
				<React.Fragment>
					<Divider horizontal>
						<Header as="h4">
							<Icon name="info circle" />
							Patient Information
						</Header>
					</Divider>
				</React.Fragment>
				<Container floated="center">
					<UserInfo
						editForm={this.state.editForm}
						user={user}
						_onChange={this._onChange}
						_onSubmit={this._onSubmit}
						userInfoEditHandler={this.userInfoEditHandler}
						userInfoSaveHandler={this.userInfoSaveHandler}
					/>
				</Container>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		user: state.user
	};
};

const mapDispatch = dispatch => {
	return {
		updatePatient: (id, updatedPatientInfo) =>
			dispatch(updatePatient(id, updatedPatientInfo))
	};
};
export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	email: PropTypes.string
};
