const { StaffModel } = require('../src/db/models/staff.model');
const { hashPassword } = require('../src/utils/hashPassword');

// @ TODO: Update to suit your own data
const data = [
  {
    name: 'Domey Benjamin',
    username: 'domey',
    email: 'domeybenjamin1@gmail.com',
    department: 'Research And Development',
    password: hashPassword('pineapple'),
  },
  {
    name: 'Emmanuel Akam',
    username: 'akam',
    email: 'emmanuelakam@gmail.com',
    department: 'Research And Development',
    password: hashPassword('pineapple'),
  },
];

module.exports = async function () {
  console.log('Seeding Staff Data...\n');

  for (let index = 0; index < data.length; index++) {
    const staffData = data[index];
    console.log(`Seeding ${staffData.name} Details...`)
    const doesExists = await StaffModel.findOne({ email: staffData.email });
    if (doesExists) {
      console.log(`Staff with email ${staffData.email} already exists`);
      continue;
    }
    const staff = new StaffModel(staffData);
    await staff.save();
  }

  console.log('Done Seeding Staff Data...\n');

};
