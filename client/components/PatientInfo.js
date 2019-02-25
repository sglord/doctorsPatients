import React from 'react';
import { Grid, Container, Header } from 'semantic-ui-react';

const PatientInfo = props => {
	const { patient } = props;
	return (
		<Container>
			<Header>Patient Info</Header>
			<Grid padded relaxed>
				<Grid.Row>
					<Grid.Column width={3} textAlign="right">
						Name:
					</Grid.Column>
					<Grid.Column textAlign="left">{patient.name}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={3} textAlign="right">
						Age:
					</Grid.Column>
					<Grid.Column textAlign="left">{patient.age}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={3} textAlign="right">
						Email:
					</Grid.Column>
					<Grid.Column textAlign="left">{patient.email}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={3} textAlign="right">
						Address:
					</Grid.Column>
					<Grid.Column textAlign="left">{patient.address}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={3} textAlign="right">
						Phone:
					</Grid.Column>
					<Grid.Column textAlign="left">{patient.phone}</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};
export default PatientInfo;
