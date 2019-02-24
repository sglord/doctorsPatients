const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Patient = db.define('patient', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
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
	},
	password: {
		type: Sequelize.STRING,
		// Making `.password` act like a func hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('password');
		}
	},
	salt: {
		type: Sequelize.STRING,
		// Making `.salt` act like a function hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('salt');
		}
	}
});

module.exports = Patient;

/**
 * instanceMethods
 */
Patient.prototype.correctPassword = function(candidatePwd) {
	return Patient.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Patient.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

Patient.encryptPassword = function(plainText, salt) {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = patient => {
	if (patient.changed('password')) {
		patient.salt = Patient.generateSalt();
		patient.password = Patient.encryptPassword(
			patient.password(),
			patient.salt()
		);
	}
};

Patient.beforeCreate(setSaltAndPassword);
Patient.beforeUpdate(setSaltAndPassword);
