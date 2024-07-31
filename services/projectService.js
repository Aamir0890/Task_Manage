const teamRepository = require('../repository/team-repository');
const projectRepository = require('../repository/projectRepository');

exports.createProject = async (userId, teamId, projectName) => {
    console.log(userId,teamId)
    const isTeamMember = await teamRepository.findTeamMember(userId, teamId);
    console.log(isTeamMember)
    if (!isTeamMember) {
        throw new Error('User is not a member of this team');
    }

    const project = await projectRepository.createProject({
        name: projectName,
        teamId: teamId
    });

    return project;
};
