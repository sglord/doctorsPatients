'use strict';

const db = require('../server/db');
const { Patient, Doctor, User } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const users = await Promise.all([
		User.create({
			email: 'cory@email.com',
			password: '123'
		}),
		User.create({
			email: 'murphy@email.com',
			password: 'xxx'
		}),
		User.create({
			email: 'Erik@email.com',
			password: 'zzz'
		}),
		User.create({
			email: 'Ryan@email.com',
			password: '1234'
		}),
		User.create({
			email: 'John@email.com',
			password: '12345'
		}),
		User.create({
			email: 'Joseph@email.com',
			password: '1324124'
		}),
		User.create({
			email: 'Jay@email.com',
			password: 'afdsaf'
		}),
		User.create({
			email: 'Danielle@email.com',
			password: '1324'
		}),
		User.create({
			email: 'Melanie@email.com',
			password: 'adfasdf'
		}),
		User.create({
			email: 'Megan@email.com',
			password: 'adfafadf'
		}),
		User.create({
			email: 'cody@email.com',
			password: '12345xx'
		}),
		User.create({
			email: 'alex@email.com',
			password: '1234xx'
		})
	]);
	const patients = await Promise.all([
		Patient.create({
			name: 'Cory',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Murphy',
			age: 47,
			address: '555 avenue',
			phone: ''
		}),
		Patient.create({
			name: 'Erik',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Ryan',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'John',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Joseph',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Jay',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Danielle',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Melanie',
			age: 35,
			address: '123 street',
			phone: ''
		}),
		Patient.create({
			name: 'Megan',
			age: 35,
			address: '123 street',
			phone: ''
		})
	]);
	const doctors = await Promise.all([
		Doctor.create({
			name: 'Dr. Cody'
		}),
		Doctor.create({
			name: 'Dr. Alex'
		})
	]);

	console.log(`seeded ${patients.length} patients`);
	console.log(`seeded ${doctors.length} doctors`);
	console.log(`seeded ${users.length} users`);
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
