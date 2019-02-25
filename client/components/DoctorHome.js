import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Container,
	Modal,
	Table,
	Button,
	Divider,
	Header
} from 'semantic-ui-react';

import {
	fetchDoctorPatients,
	fetchDoctorSinglePatient
} from '../store/doctors';
import PatientInfo from './PatientInfo';

class DoctorHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			selectedPatient: {}
		};
	}
	componentDidMount() {
		this.props.fetchDoctorPatients(this.props.user.id);
	}
	handleModalClose() {
		this.setState({ modalOpen: false });
	}
	render() {
		return (
			<Container>
				<Divider hidden />

				<Header as="h1">Welcome, {this.props.user.email}</Header>

				<div>
					<Divider hidden />
					<Container>
						<Table singleLine selectable striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Patient ID</Table.HeaderCell>
									<Table.HeaderCell>Patient Name</Table.HeaderCell>
									<Table.HeaderCell>Age</Table.HeaderCell>
									<Table.HeaderCell>Patient Details</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{this.props.patients.map(patient => {
									return (
										<Table.Row key={patient.id}>
											<Table.Cell>{patient.id}</Table.Cell>
											<Table.Cell>{patient.name}</Table.Cell>
											<Table.Cell>{patient.age}</Table.Cell>
											<Table.Cell>
												<React.Fragment>
													<Button
														onClick={() => {
															this.setState({
																modalOpen: true,
																selectedPatient: patient
															});
														}}>
														View Details
													</Button>
												</React.Fragment>
											</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
						<Modal centered={false} open={this.state.modalOpen}>
							<Modal.Content>
								<PatientInfo patient={this.state.selectedPatient} />
								<Button
									onClick={() => {
										this.handleModalClose();
									}}>
									Close
								</Button>
							</Modal.Content>
						</Modal>
					</Container>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		user: state.user,
		patients: state.doctors.patients,
		selectedPatient: state.selectedPatient
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchDoctorPatients: id => {
			dispatch(fetchDoctorPatients(id));
		},
		fetchDoctorSinglePatient: (id, patientId) => {
			dispatch(fetchDoctorSinglePatient(id, patientId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorHome);
