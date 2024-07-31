const teamRepository = require('../repository/team-repository');
const { sendInvitationEmail } = require('../utils/mail/mail');
const userRepository=require('../repository/user-repository')
exports.createTeam = async (name, creatorId) => {
    return teamRepository.createTeam(name, creatorId);
};


exports.inviteToTeam = async (teamId, email, inviterId) => {
    // Find the team
    const team = await teamRepository.findTeamById(teamId);
    if (!team) {
        throw new Error('Team not found');
    }

    // Check if the inviter is a team member
    const inviter = await teamRepository.findTeamMember(teamId, inviterId);
    if (!inviter) {
        throw new Error('Only team members can send invitations');
    }

    // Find the user by email
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        return {
            message: 'User not found',
            notFoundUser: email
        };
    }

    // Check if the user is already a team member
    const existingMember = await teamRepository.findTeamMember(teamId, user.id);
    if (existingMember) {
        return {
            message: `User ${email} is already a member of this team`,
            alreadyMember: true
        };
    }

    // Add the user to the team
    await teamRepository.addMemberToTeam(teamId, user.id);

    // Send invitation email
    // await sendInvitationEmail(user.email, team.name);
    
    return {
        message: 'Invitation sent successfully',
        invitedUser: user.email
    };
};

exports.getTeamMembers = async (teamId) => {
  
    return teamRepository.findTeamMembers(teamId);
};