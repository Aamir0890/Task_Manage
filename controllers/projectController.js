const projectService=require('../services/projectService')

exports.createProject = async (req, res) => {
    try {
        const { teamId, projectName } = req.body;
        const userId = req.user.id; 
        const project = await projectService.createProject(teamId, userId, projectName);
        return res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
