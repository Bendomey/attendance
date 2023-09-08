const { CONFIG } = require('../../config');
const { AdminModel } = require('../db/models/admin.model');
const { comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/jwt-token');

exports.ping = function () {
  return 'Admin Service All Green!';
};

exports.loginAdmin = async function ({ username, password }) {
  // find admin by username
  const adminInDb = await AdminModel.findOne({ username }).lean();

  if (!adminInDb) {
    throw new Error('Admin not found');
  }

  // compare passwords
  const isSame = comparePassword(adminInDb.password, password);

  if (!isSame) {
    throw new Error('Password Incorrect');
  }

  delete adminInDb.password;
  const token = generateToken(
    {
      username: adminInDb.username,
      id: adminInDb._id,
    },
    CONFIG.JWT_TOKEN_KEY.ADMIN
  );

  return {
    admin: adminInDb,
    token,
  };
};

exports.getAdmin = async function ({ id }) {
  // find user by id
  const adminInDB = await AdminModel.findOne({ _id: id }).lean();

  if(!adminInDB){
      throw new Error('Admin not found');
  }

  delete adminInDB.password;
  return adminInDB
};
