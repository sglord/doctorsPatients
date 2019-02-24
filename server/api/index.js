const router = require('express').Router();
module.exports = router;

router.use('/patients', require('./patients'));
router.use('/doctors', require('./doctors'));

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
