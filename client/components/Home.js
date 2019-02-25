import React from 'react';
import { connect } from 'react-redux';

import DoctorHome from './DoctorHome';
import UserHome from './user-home';

const Home = props => {
	return props.isDoctor ? <DoctorHome /> : <UserHome />;
};

const mapState = state => {
	return {
		isDoctor: state.user.isDoctor
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(Home);
