const router = require('express').Router();
const { Doctor, Patient } = require('../db/models');
module.exports = router;

// /api/doctors
// get one doctor info
router.get('/:id', async (req, res, next) => {
	console.log(req.user);
	try {
		if (req.user.id === Number(req.params.id)) {
			const doctor = await Doctor.findOne({
				where: {
					id: req.params.id
				},
				attributes: ['id', 'email', 'name']
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
			const doctorsPatients = await Doctor.findOne({
				where: {
					id: id
				},
				include: [{ model: Patient }]
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
	console.log(req.user);
	try {
		if (req.user.id === Number(id)) {
			const doctorSinglePatient = await Patient.findOne({
				where: {
					id: patientId
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
