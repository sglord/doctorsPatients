const router = require('express').Router();
const { Patient } = require('../db/models');
module.exports = router;

//grab individual patient info
router.get('/:id', async (req, res, next) => {
	try {
		if (req.user.id === Number(req.params.id)) {
			const patient = await Patient.findOne({
				where: {
					id: req.params.id
				},
				attributes: ['id', 'email', 'name', 'age', 'address', 'phone']
			});
			res.json(patient);
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
});

// update patient info
router.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const updatedPatientInfo = {
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		address: req.body.address,
		phone: req.body.phone
	};

	try {
		if (req.user.id === Number(id)) {
			const updatedPatient = await Patient.update(updatedPatientInfo, {
				where: {
					id: id
				},
				returning: true,
				plain: true
			});

			if (!updatedPatient) {
				const err = Error('not found');
				err.status = 404;
				throw err;
			} else {
				res.json(updatedPatient);
			}
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		next(error);
	}
});
