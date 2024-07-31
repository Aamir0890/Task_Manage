const {models:{Project}}=require('../models')


exports.createProject = async (projectData) => {
    return await Project.create(projectData);
};

