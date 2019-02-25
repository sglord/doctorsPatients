const User = require('./users');

User.belongsTo(User, { as: 'doctor' });

module.exports = {
	User
};
