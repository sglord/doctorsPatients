import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component {
	state = {
		activeItem: 'home'
	};

	handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

	handleLogOut() {
		this.props.logout();
	}
	render() {
		const { activeItem } = this.state;
		const { isLoggedIn } = this.props;
		return (
			<div>
				<Menu pointing>
					<Menu.Item
						as={Link}
						to="/home"
						name="DoctorsPatients"
						icon="medkit"
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to="/home"
						name="home"
						icon="child"
						active={activeItem === 'home'}
						onClick={this.handleItemClick}
					/>

					<Menu.Menu position="right">
						{isLoggedIn ? null : (
							<Menu.Item
								as={Link}
								to="/login"
								name="Login"
								icon="user"
								active={activeItem === 'Login'}
								onClick={this.handleItemClick}
							/>
						)}
						{isLoggedIn ? (
							<Menu.Item
								name="Logout"
								icon="remove user"
								onClick={this.handleLogOut.bind(this)}
							/>
						) : null}
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
};
