const router = require('express').Router();
const { Doctor, Patient, User } = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
	try {
		console.log(req.body.method);
		let user;
		if (req.body.method === 'doctors') {
			user = await User.findOne({
				where: { email: req.body.email }
				// include: [{ model: Doctor }]
			});
		}
		if (req.body.method === 'patients') {
			user = await User.findOne({
				where: { email: req.body.email }
				// include: [{ model: Patient }]
			});
		}
		if (!user) {
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			res.status(401).send('Wrong email and/or password');
		} else {
			req.login(user, err => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/me', (req, res) => {
	res.json(req.user);
});
