const { StaffModel } = require('../db/models/staff.model')

exports.ping = function () {
    return "Staff Service All Green!"
}

exports.getStaff = async function ({ username }) {
    // find user by username
    const staffInDB = await StaffModel.findOne({ username }).lean();

    if(!staffInDB){
        throw new Error('Staff not found');
    }

    return staffInDB
};
