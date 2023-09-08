const { StaffModel } = require('../db/models/staff.model');
const { AttendanceModel } = require('../db/models/attendance.model');
const { ProjectModel } = require('../db/models/project.model');
const { customAlphabet } = require('nanoid');
const { CONFIG } = require('../../config');
const { sendEmail } = require('../utils/send-emails');

exports.ping = function () {
  return 'Attendance Service All Green!';
};

exports.clockIn = async function ({ username }) {
  // find user by username
  const staff = await StaffModel.findOne({ username }).lean();

  if (!staff) {
    throw new Error('Staff not found');
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // Has user already been logged in today?
  const hasUserCreatedAttendance = await AttendanceModel.findOne({
    staff: staff._id,
    clockInTime: { $gte: start, $lt: end },
  });

  if (hasUserCreatedAttendance) {
    throw new Error('Staff Has Already Clocked In For Today');
  }

  const clockoutCode = customAlphabet(CONFIG.VERFICATION_CODE.ALPHABET)(
    CONFIG.VERFICATION_CODE.LENGTH
  );

  const newAttendance = new AttendanceModel({
    staff: staff._id,
    clockInTime: Date.now(),
    clockoutCode,
  });

  await newAttendance.save();

  sendEmail({
    to: staff.email,
    subject: 'GNPC Attendance - Clock In',
    text: `You just clocked in successfully! Use this code: ${clockoutCode} whenever you want to clock out! Have a great day today!\n\n\nCheers!`,
  })

  return newAttendance;
};

exports.clockOut = async function ({
  id,
  briefOfWhatWasDoneForTheDay,
  workForToday,
  project,
  workForTodayStartTime,
  workForTodayEndTime,
  workHours,
}) {
  // find attendance by record
  const attendance = await AttendanceModel.findOne({
    staff: id,
    clockoutTime: null,
  }).populate('staff');

  if (!attendance) {
    // This should never happen of course.
    throw new Error('Staff Has Already Clocked Out');
  }

  // find project by record
  const projectInDb = await ProjectModel.findOne({
    _id: project,
  });

  if (!projectInDb) {
    // This should never happen of course.
    throw new Error('Project Is Invalid');
  }

  attendance.clockoutTime = Date.now();
  attendance.briefOfWhatWasDoneForTheDay = briefOfWhatWasDoneForTheDay;
  attendance.workForToday = workForToday;
  attendance.project = project;
  attendance.workHours = workHours;
  attendance.workForTodayStartTime = workForTodayStartTime;
  attendance.workForTodayEndTime = workForTodayEndTime;

  await attendance.save();

  sendEmail({
    to: attendance.staff.email,
    subject: 'GNPC Attendance - Clocked Out',
    text: `You just clocked out successfully! See you tomorrow.\n\n\nCheers!`,
  })
  return true;
};

exports.getAttendances = async function () {
  const allAttendances =  await AttendanceModel.find().populate({path: 'staff', select: '-password'}).populate('project').exec();

  return allAttendances
}