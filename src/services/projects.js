const { ProjectModel } = require('../db/models/project.model');

exports.ping = function () {
  return 'Projects Service All Green!';
};

exports.getProjects = function(){
    return ProjectModel.find().lean();
}