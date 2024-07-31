const { models: { User, Team, TeamMembers } } = require('../models');


exports.createTeam = async (name, creatorId) => {
    const team = await Team.create({ name });
    
    await TeamMembers.create({ teamId: team.id, userId: creatorId });
    return team;
};

exports.findTeamById = async (teamId) => {
    return Team.findByPk(teamId);
};

exports.addMemberToTeam = async (teamId, userId) => {
    return TeamMembers.create({ teamId, userId });
};

exports.findTeamMember = async (userId, teamId) => {
  console.log(teamId)
    return TeamMembers.findOne({where:{teamId,userId}});
};

exports.findTeamMembers = async (teamId) => {
    return TeamMembers.findAll({
      where: { teamId },
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'name', 'email']
      }]
    });
  };