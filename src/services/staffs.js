const { CONFIG } = require('../../config');
const { StaffModel } = require('../db/models/staff.model');
const { AttendanceModel } = require('../db/models/attendance.model');
const { comparePassword, hashPassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwt-token');
const { customAlphabet } = require('nanoid');
const { sendEmail } = require('../utils/send-emails');

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
    clockoutTime: null,
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

exports.createStaff = async function ({ email, username, name, department }) {
  // find user by username
  const staffInDB = await StaffModel.findOne({
    $or: [{ username: username }, { email: email }],
  }).lean();

  if (staffInDB) {
    throw new Error('Staff already exists with this information');
  }

  const newPassword = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz')(
    10
  );

  const newStaff = new StaffModel({
    username,
    email,
    name,
    department,
    password: hashPassword(newPassword),
  });

  await newStaff.save();
  
  sendEmail({
    to: email,
    subject: 'Welcome to GNPC Attendance',
    text: `Your staff account was created successfully!\n\nUse this credentials to access your account:\nEmail: ${email}\nPassword: ${newPassword}\n\n\nCheers!`,
  })

  return {...newStaff._doc, password: undefined};
};

exports.getStaffs = async function () {
  const allStaffs =  await StaffModel.find().lean();

  return allStaffs.map(staff => ({...staff, password: undefined}))
}
