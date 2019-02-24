const Patient = require('./patients');
const Doctor = require('./doctors');

Patient.belongsTo(Doctor);
Doctor.hasMany(Patient);

module.exports = {
	Patient,
	Doctor
};
