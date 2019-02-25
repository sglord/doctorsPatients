const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//get all patients for doctor
router.get('/:id/patients', async (req, res, next) => {
	let { id } = req.params;
	try {
		if (req.user.id === Number(id)) {
			const doctorsPatients = await User.findAll({
				where: {
					doctorId: req.params.id
				},
				include: [{ model: User, as: 'doctor' }]
			});
			res.json(doctorsPatients);
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		next(error);
	}
});
