const commentService = require('../services/commentService');
const { commentSchema } = require('../utils/validations/taskSchema');
const errorHandler = require('../utils/errors/errorHandler');

exports.createComment = async (req, res) => {
    const validation = commentSchema.safeParse(req.body);
      
    if (!validation.success) {
        return errorHandler.validationError(res, validation.error.errors);
    }
  
    const data = {
        ...validation.data,
        userId: req.user.id
    };
  
    try {
        const newComment = await commentService.createCommnet(data);
        res.status(201).json({ success: true, message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        if (error.message === "Task not found" || error.message === "User not able to create comment as task not assigned") {
            return errorHandler.forbidden(res, error.message);
        } else {
            return errorHandler.internalServerError(res);
        }
    }
};

exports.getAllComment = async (req, res) => {
    try {
        const body = await commentService.getAllCommnet(req.body.id);
        console.log(body);
        if (!body) {
            return errorHandler.notFound(res, 'Task not found for id');
        }
        res.status(200).json(body);
    } catch (error) {
        console.error('Error getting comments:', error);
        return errorHandler.internalServerError(res, 'Failed to get comments');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id: commentId } = req.body;
        const userId = req.user.id;

        if (!commentId) {
            return errorHandler.badRequest(res, 'Comment ID is required');
        }

        const result = await commentService.deleteComment(commentId, userId);
        
        if (!result.success) {
            return errorHandler.forbidden(res, result.message);
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting comment:', error);
        return errorHandler.internalServerError(res, 'Failed to delete comment');
    }
};