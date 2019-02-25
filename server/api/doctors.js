const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// /api/doctors
// get one doctor info
router.get('/:id', async (req, res, next) => {
	try {
		if (req.user.id === Number(req.params.id)) {
			const doctor = await User.findOne({
				where: {
					id: req.params.id,
					isDoctor: true
				}
			});
			res.json(doctor);
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
});

//get all patients
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

// get one patient info
router.get('/:id/patients/:patientId', async (req, res, next) => {
	let { id, patientId } = req.params;
	try {
		if (req.user.id === Number(id)) {
			const doctorSinglePatient = await User.findOne({
				where: {
					id: patientId,
					doctorId: id
				}
			});
			res.json(doctorSinglePatient);
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		next(error);
	}
});
