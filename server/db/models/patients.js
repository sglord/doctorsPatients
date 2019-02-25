const Sequelize = require('sequelize');
const db = require('../db');

const Patient = db.define('patient', {
	name: {
		type: Sequelize.STRING
	},
	age: {
		type: Sequelize.STRING
	},
	address: {
		type: Sequelize.STRING
	},
	phone: {
		type: Sequelize.STRING
	}
});

module.exports = Patient;
