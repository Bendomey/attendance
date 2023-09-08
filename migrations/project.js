const { ProjectModel } = require('../src/db/models/project.model');

const data = [
  {
    title: 'Electronic Document and Record Management System',
  },
  {
    title: 'Open Data Portal',
  },
  {
    title: 'Research and Technology Center ',
  },
  {
    title: 'Phase II Transcription Project ',
  },
  {
    title: 'Data Migration Project ',
  },
  {
    title: 'Data Cleansing Project',
  },
  {
    title: 'Records Management and Improvement Project',
  },
  {
    title: 'E library Project',
  }
];

module.exports = async function () {
  console.log('Seeding Project Data...\n');

  for (let index = 0; index < data.length; index++) {
    const projectData = data[index];
    console.log(`Seeding ${projectData.title} Details...`);
    const doesExists = await ProjectModel.findOne({ title: projectData.title });
    if (doesExists) {
      console.log(`Project with title ${projectData.title} already exists`);
      continue;
    }
    const project = new ProjectModel(projectData);
    await project.save();
  }

  console.log('Done Seeding project Data...\n');
};
