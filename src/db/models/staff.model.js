const mongoose = require('mongoose')


const StaffSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    department: {
        // @TODO: You can keep it as a string for now. In future, it's supposed to be a reference to a department.
        type: mongoose.SchemaTypes.String,
        required: true,
    }
}, { timestamps: true })

exports.StaffModel = mongoose.model('Staff', StaffSchema)