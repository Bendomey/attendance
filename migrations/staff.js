const { StaffModel } = require('../src/db/models/staff.model');

// @ TODO: Update to suit your own data
const data = [
  {
    name: 'Domey Benjamin',
    username: 'domey',
    email: 'domeybenjamin1@gmail.com',
    department: 'Research And Development',
  },
  {
    name: 'Ned Kelly',
    username: 'ned',
    email: 'nedkelly205@gmail.com',
    department: 'Research And Development',
  },
];

module.exports = async function () {
  console.log('Seeding Staff Data...\n');

  for (let index = 0; index < data.length; index++) {
    const staffData = data[index];
    console.log(`Seeding ${staffData.name} Details...`)
    
    const staff = new StaffModel(staffData);
    await staff.save();
  }

  console.log('Done Seeding Staff Data...\n');

};
