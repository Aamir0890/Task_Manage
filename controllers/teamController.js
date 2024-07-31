
const teamService = require('../services/teamService');
const ErrorHandler=require('../utils/errors/errorHandler')

exports.createTeam = async (req, res) => {
    const { name } = req.body;
    const creatorId = req.user.id;

    try {
        if (!name) {
            return ErrorHandler.badRequest(res, 'Team name is required');
        }

        const team = await teamService.createTeam(name, creatorId);
        res.status(201).json({ success: true, message: 'Team created successfully', team });
    } catch (error) {
        console.error('Error creating team:', error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.inviteToTeam = async (req, res) => {
    const { teamId, email } = req.body;
    const inviterId = req.user.id;

    try {
        if (!teamId || !email) {
            return ErrorHandler.badRequest(res, 'Team ID and email are required');
        }

        const result = await teamService.inviteToTeam(teamId, email, inviterId);
        res.status(200).json({
            success: true,
            message: 'Invitations sent successfully',
            notFoundUsers: result.notFoundUsers
        });
    } catch (error) {
        console.error('Error inviting to team:', error);
        if (error.message === 'Team not found' || error.message === 'User not authorized to invite') {
            return ErrorHandler.forbidden(res, error.message);
        }
        return ErrorHandler.badRequest(res, error.message);
    }
};

exports.getTeamMembers = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return ErrorHandler.badRequest(res, 'Team ID is required');
        }

        const members = await teamService.getTeamMembers(id);
        
        if (!members) {
            return ErrorHandler.notFound(res, 'Team not found');
        }

        res.status(200).json({ success: true, members });
    } catch (error) {
        console.error('Error fetching team members:', error);
        return ErrorHandler.internalServerError(res);
    }
};