// const Patient = require('./patients');
// const Doctor = require('./doctors');
const User = require('./users');

// Patient.belongsTo(User);
// Doctor.belongsTo(User);

// Patient.belongsTo(Doctor);
// Doctor.hasMany(Patient);

User.belongsTo(User, { as: 'doctor' });

module.exports = {
	// Patient,
	// Doctor,
	User
};
