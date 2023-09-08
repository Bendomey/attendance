const mongoose = require('mongoose')


const AttendanceSchema = new mongoose.Schema({
    staff: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Staff'
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Project'
    },
    clockInTime: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    clockoutCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    clockoutTime: {
        type: mongoose.SchemaTypes.Date,
    },
    briefOfWhatWasDoneForTheDay: {
        type: mongoose.SchemaTypes.String,
    },
    workForToday: {
        type: mongoose.SchemaTypes.String,
    },
    workForTodayStartTime: {
        type: mongoose.SchemaTypes.String,
    },
    workForTodayEndTime: {
        type: mongoose.SchemaTypes.String,
    },
    workHours: {
        type: mongoose.SchemaTypes.String,
    },
}, { timestamps: true })

AttendanceSchema.virtual('status').get(function() {
    return !Boolean(this.clockoutTime) ? "AWAITING_CLOCKOUT" : "CLOCKED_OUT";
});

exports.AttendanceModel= mongoose.model('Attendance', AttendanceSchema)