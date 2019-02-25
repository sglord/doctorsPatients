import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Divider, Icon, Container } from 'semantic-ui-react';

import UserInfo from './UserInfo';
import { updateUser } from '../store/user';
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
		this.userInfoEditHandler = this.userInfoEditHandler.bind(this);
		this.userInfoSaveHandler = this.userInfoSaveHandler.bind(this);
	}
	_onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	userInfoEditHandler() {
		this.state.editForm
			? this.setState({ editForm: false })
			: this.setState({ editForm: true });
	}

	userInfoSaveHandler() {
		this.state.editForm
			? this.setState({ editForm: false })
			: this.setState({ editForm: true });

		const id = this.props.user.id;
		const updatedPatientInfo = this.state;
		this.props.updateUser(id, updatedPatientInfo);
	}

	render() {
		const { user } = this.props;

		return (
			<Container>
				<Divider hidden />
				<Header as="h2">Welcome {user.name}</Header>
				<Container>
					<Divider horizontal>
						<Header as="h4">
							<Icon name="info circle" />
							Patient Information
						</Header>
					</Divider>
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
				</Container>
			</Container>
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
		updateUser: (id, updatedUserInfo) =>
			dispatch(updateUser(id, updatedUserInfo))
	};
};
export default connect(mapState, mapDispatch)(UserHome);
