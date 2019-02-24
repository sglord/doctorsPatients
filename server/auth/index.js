const router = require('express').Router();
const { Doctor, Patient } = require('../db/models');
module.exports = router;

router.post('/login/patient', async (req, res, next) => {
	try {
		const user = await Patient.findOne({ where: { email: req.body.email } });
		if (!user) {
			console.log('Patient Not found:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for patient:', req.body.email);
			res.status(401).send('Wrong email and/or password');
		} else {
			req.login(user, err => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});
router.post('/login', async (req, res, next) => {
	try {
		const user = await Doctor.findOne({ where: { email: req.body.email } });
		if (!user) {
			console.log('Doctor Not found:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for patient:', req.body.email);
			res.status(401).send('Wrong email and/or password');
		} else {
			req.login(user, err => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

// router.post('/signup', async (req, res, next) => {
// 	try {
// 		const user = await Patient.create(req.body);
// 		req.login(user, err => (err ? next(err) : res.json(user)));
// 	} catch (err) {
// 		if (err.name === 'SequelizeUniqueConstraintError') {
// 			res.status(401).send('User already exists');
// 		} else {
// 			next(err);
// 		}
// 	}
// });

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

// router.get('/me', (req, res) => {
// 	res.json(req.user);
// });
