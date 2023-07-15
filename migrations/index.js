const dbConnecttion = require('../src/db/index');
const staffMigrations = require('./staff');

async function migrate() {
  console.log("Started Seeding")
  // Connect to db.
  await dbConnecttion();

  // Seed staff data
  await staffMigrations()

  console.log("Done Seeding!")
}


migrate().catch(console.log)