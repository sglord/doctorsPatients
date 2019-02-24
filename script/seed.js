'use strict';

const db = require('../server/db');
const { Patient, Doctor } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const patients = await Promise.all([
		Patient.create({
			email: 'cory@email.com',
			name: 'Cory',
			age: 35,
			address: '123 street',
			phone: '',
			password: '123'
		}),
		Patient.create({
			email: 'murphy@email.com',
			name: 'Murphy',
			age: 47,
			address: '555 avenue',
			phone: '',
			password: 'xxx'
		}),
		Patient.create({
			email: 'Erik@email.com',
			name: 'Erik',
			age: 35,
			address: '123 street',
			phone: '',
			password: 'zzz'
		}),
		Patient.create({
			email: 'Ryan@email.com',
			name: 'Ryan',
			age: 35,
			address: '123 street',
			phone: '',
			password: '1234'
		}),
		Patient.create({
			email: 'John@email.com',
			name: 'John',
			age: 35,
			address: '123 street',
			phone: '',
			password: '12345'
		}),
		Patient.create({
			email: 'Joseph@email.com',
			name: 'Joseph',
			age: 35,
			address: '123 street',
			phone: '',
			password: '1324124'
		}),
		Patient.create({
			email: 'Jay@email.com',
			name: 'Jay',
			age: 35,
			address: '123 street',
			phone: '',
			password: 'afdsaf'
		}),
		Patient.create({
			email: 'Danielle@email.com',
			name: 'Danielle',
			age: 35,
			address: '123 street',
			phone: '',
			password: '1324'
		}),
		Patient.create({
			email: 'Melanie@email.com',
			name: 'Melanie',
			age: 35,
			address: '123 street',
			phone: '',
			password: 'adfasdf'
		}),
		Patient.create({
			email: 'Megan@email.com',
			name: 'Megan',
			age: 35,
			address: '123 street',
			phone: '',
			password: 'adfafadf'
		})
	]);
	const doctors = await Promise.all([
		Doctor.create({
			email: 'cody@email.com',
			name: 'Dr. Cody',
			password: '12345xx'
		}),
		Doctor.create({
			email: 'alex@email.com',
			name: 'Dr. Alex',
			password: '1234xx'
		})
	]);

	console.log(`seeded ${patients.length} patients`);
	console.log(`seeded ${doctors.length} doctors`);

	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
