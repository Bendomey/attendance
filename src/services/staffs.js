const { CONFIG } = require('../../config');
const { StaffModel } = require('../db/models/staff.model');
const { AttendanceModel } = require('../db/models/attendance.model');
const { comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwt-token');

exports.ping = function () {
  return 'Staff Service All Green!';
};

exports.loginStaff = async function ({ username, password }) {
  // find staff by username
  const staffInDb = await StaffModel.findOne({ username }).lean();

  if (!staffInDb) {
    throw new Error('Staff not found');
  }

  // compare passwords
  const isSame = comparePassword(staffInDb.password, password);

  if (!isSame) {
    throw new Error('Password Incorrect');
  }

  delete staffInDb.password;
  const token = generateToken(
    {
      username: staffInDb.username,
      id: staffInDb._id,
    },
    CONFIG.JWT_TOKEN_KEY.STAFF
  );

  return {
    staff: staffInDb,
    token,
  };
};

exports.getStaff = async function ({ username }) {
  // find user by username
  const staffInDB = await StaffModel.findOne({ username }).lean();

  if (!staffInDB) {
    throw new Error('Staff not found');
  }

  delete staffInDB.password;

  return staffInDB;
};

exports.getStaffByClockInCode = async function ({ code }) {
  // find attendance by record
  const attendance = await AttendanceModel.findOne({
    clockoutCode: code,
    clockoutTime: null
  });

  if (!attendance) {
    throw new Error('Code Is Incorrect Or Staff Has Not Clocked In');
  }

  // find user by username
  const staffInDB = await StaffModel.findOne({ _id: attendance.staff }).lean();

  if (!staffInDB) {
    throw new Error('Staff not found');
  }

  delete staffInDB.password;


  const token = generateToken(
    {
      username: staffInDB.username,
      id: staffInDB._id,
    },
    CONFIG.JWT_TOKEN_KEY.STAFF
  );

  return {
    staff: staffInDB,
    token,
  };
};
