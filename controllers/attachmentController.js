const attachmentService=require('../services/attachmentService');
const errorHandler=require('../utils/errors/errorHandler')

exports.createAttachment = async (req, res) => {
    try {
        const { filePath, taskId } = req.body;
        const userId = req.user.id;

        if (!filePath || !taskId) {
            return errorHandler.badRequest(res, 'File path and Task ID are required');
        }

        const result = await attachmentService.createAttachment({ filePath, taskId, userId });
     
        if (result) {
            res.status(201).json(result);
        } else {
            return errorHandler.badRequest(res, 'Failed to create attachment');
        }
    } catch (error) {
        console.error('Error creating attachment:', error);
        return errorHandler.internalServerError(res, 'Failed to create attachment');
    }
};

exports.getAllAttachment = async (req, res) => {
    try {
        console.log(req.body.id);
        const body = await attachmentService.getAllAttachment(req.body.id);
        
        if (!body) {
            return errorHandler.notFound(res, 'Task not found for id');
        }
        res.status(200).json(body);
    } catch (error) {
        console.error('Error getting attachments:', error);
        return errorHandler.internalServerError(res, 'Failed to get all attachments');
    }
};

exports.deleteAttachment = async (req, res) => {
    try {
        const { id: attachmentId } = req.body;
        const userId = req.user.id;

        if (!attachmentId) {
            return errorHandler.badRequest(res, 'Attachment ID is required');
        }

        const result = await attachmentService.deleteAttachment(attachmentId, userId);
        
        if (!result.success) {
            return errorHandler.forbidden(res, result.message);
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting attachment:', error);
        return errorHandler.internalServerError(res, 'Failed to delete attachment');
    }
};