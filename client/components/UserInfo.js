import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Grid, Form } from 'semantic-ui-react';

class UserInfo extends Component {
	render() {
		const { user, editForm } = this.props;

		return (
			<div>
				{editForm ? (
					<Container>
						<Grid padded relaxed>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Name:
								</Grid.Column>
								<Grid.Column textAlign="left">{user.name}</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Age:
								</Grid.Column>
								<Grid.Column textAlign="left">{user.age}</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Email:
								</Grid.Column>
								<Grid.Column textAlign="left">{user.email}</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Address:
								</Grid.Column>
								<Grid.Column textAlign="left">{user.address}</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Phone:
								</Grid.Column>
								<Grid.Column textAlign="left">{user.phone}</Grid.Column>
							</Grid.Row>
						</Grid>
						<Button
							size="mini"
							floated="right"
							compact
							onClick={this.props.userInfoEditHandler}>
							Edit
						</Button>
					</Container>
				) : (
					<Container>
						<Grid padded relaxed>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Name:
								</Grid.Column>
								<Grid.Column textAlign="left">
									<React.Fragment>
										<Form.Input
											name="firstName"
											defaultValue={user.name}
											onChange={this.props._onChange}
										/>
									</React.Fragment>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Age:
								</Grid.Column>
								<Grid.Column textAlign="left">
									<React.Fragment>
										<Form.Input
											name="age"
											defaultValue={user.age}
											onChange={this.props._onChange}
										/>
									</React.Fragment>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Email:
								</Grid.Column>
								<Grid.Column textAlign="left">
									<React.Fragment>
										<Form.Input
											name="email"
											defaultValue={user.email}
											onChange={this.props._onChange}
										/>
									</React.Fragment>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Address:
								</Grid.Column>
								<Grid.Column textAlign="left">
									<React.Fragment>
										<Form.Input
											name="address"
											defaultValue={user.address}
											onChange={this.props._onChange}
										/>
									</React.Fragment>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={3} textAlign="right">
									Phone:
								</Grid.Column>
								<Grid.Column textAlign="left">
									<React.Fragment>
										<Form.Input
											name="phone"
											defaultValue={user.phone}
											onChange={this.props._onChange}
										/>
									</React.Fragment>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<Button
							size="mini"
							floated="right"
							compact
							onClick={this.props.userInfoSaveHandler}>
							Save
						</Button>
					</Container>
				)}
			</div>
		);
	}
}

export default UserInfo;
