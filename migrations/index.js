const dbConnecttion = require('../src/db/index');
const staffMigrations = require('./staff');
const projectMigrations = require('./project');
const adminMigrations = require('./admin');

async function migrate() {
  console.log('Started Seeding');
  // Connect to db.
  await dbConnecttion();

  // Seed staff data
  await staffMigrations();

  // Seed project data
  await projectMigrations();

    // Seed admin data
    await adminMigrations();

  console.log('Done Seeding!');
}

migrate().catch(console.log);
