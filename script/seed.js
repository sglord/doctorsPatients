'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const users = await Promise.all([
		User.create({
			name: 'Cory',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'cory@email.com',
			password: '123'
		}),
		User.create({
			name: 'Murphy',
			age: 47,
			address: '555 avenue',
			phone: '',
			email: 'murphy@email.com',
			password: 'xxx'
		}),
		User.create({
			name: 'Erik',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Erik@email.com',
			password: 'zzz'
		}),
		User.create({
			name: 'Ryan',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Ryan@email.com',
			password: '1234'
		}),
		User.create({
			name: 'John',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'John@email.com',
			password: '12345'
		}),
		User.create({
			name: 'Joseph',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Joseph@email.com',
			password: '1324124'
		}),
		User.create({
			name: 'Jay',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Jay@email.com',
			password: 'afdsaf'
		}),
		User.create({
			name: 'Danielle',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Danielle@email.com',
			password: '1324'
		}),
		User.create({
			name: 'Melanie',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Melanie@email.com',
			password: 'adfasdf'
		}),
		User.create({
			name: 'Megan',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'Megan@email.com',
			password: 'adfafadf'
		}),
		User.create({
			name: 'Cody',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'cody@email.com',
			password: '12345xx',
			isDoctor: true
		}),
		User.create({
			name: 'Alex',
			age: 35,
			address: '123 street',
			phone: '',
			email: 'alex@email.com',
			password: '1234xx',
			isDoctor: true
		})
	]);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
}

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

if (module === require.main) {
	runSeed();
}

module.exports = seed;
