const { AdminModel } = require('../src/db/models/admin.model');
const { hashPassword } = require('../src/utils/hashPassword');

const data = [
  {
    name:"Administrator",
    username: 'admin',
    password: hashPassword('pineapple'),
    email: "domeybenjamin1@gmail.com",
  },
];

module.exports = async function () {
  console.log('Seeding Admin Data...\n');

  for (let index = 0; index < data.length; index++) {
    const adminData = data[index];
    console.log(`Seeding ${adminData.username} Details...`);
    const doesExists = await AdminModel.findOne({ username: adminData.username });
    if (doesExists) {
      console.log(`Admin with title ${adminData.username} already exists`);
      continue;
    }
    const project = new AdminModel(adminData);
    await project.save();
  }

  console.log('Done Seeding project Data...\n');
};
