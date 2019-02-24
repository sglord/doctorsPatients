const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Doctor = db.define('doctor', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	name: {
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

module.exports = Doctor;

/**
 * instanceMethods
 */
Doctor.prototype.correctPassword = function(candidatePwd) {
	return Doctor.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Doctor.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

Doctor.encryptPassword = function(plainText, salt) {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = doctor => {
	if (doctor.changed('password')) {
		doctor.salt = Doctor.generateSalt();
		doctor.password = Doctor.encryptPassword(doctor.password(), doctor.salt());
	}
};

Doctor.beforeCreate(setSaltAndPassword);
Doctor.beforeUpdate(setSaltAndPassword);
