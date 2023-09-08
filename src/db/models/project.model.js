const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    createdBy: {// we want to know who created the project
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
        model: 'Admin'
    },
}, { timestamps: true })

exports.ProjectModel = mongoose.model('Project', ProjectSchema)