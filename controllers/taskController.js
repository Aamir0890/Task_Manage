const taskService = require('../services/taskService');
const { taskSchema, updateStatusSchema } = require('../utils/validations/taskSchema');
const ErrorHandler=require('../utils/errors/errorHandler')

exports.createTask = async (req, res) => {
    const validation = taskSchema.safeParse(req.body);
    
    if (!validation.success) {
        return ErrorHandler.validationError(res, validation.error.errors);
    }
    
    const data = {
        ...validation.data,
        status: validation.data.status || 'incomplete',
        assignedTo: req.user.id, 
        projectId: req.body.projectId 
    };
    
    try {
        const task = await taskService.createTask(data);
        res.status(201).json({ success: true, message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.getAllTask = async (req, res) => {
    try {
        const tasks = await taskService.getAllTask(req.user.id);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const validation = updateStatusSchema.safeParse(req.body);

    if (!validation.success) {
        return ErrorHandler.validationError(res, validation.error.errors);
    }
     
    try {
        const task = await taskService.changeTaskStatus(id, req.user.id, validation.data.status);
        res.status(200).json({ success: true, message: 'Task status updated successfully', task });
    } catch (error) {
        console.error('Error updating task status:', error);
        return ErrorHandler.badRequest(res, error.message);
    }
};

exports.filterTask = async (req, res) => {
    const validation = updateStatusSchema.safeParse({ status: req.query.status });
    
    if (!validation.success) {
        return ErrorHandler.validationError(res, validation.error.errors);
    }
     
    try {
        const tasks = await taskService.filterTask(req.user.id, validation.data);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error filtering tasks:', error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.searchTask = async (req, res) => {
    const q = req.query.q;
    
    if (!q) {
        return ErrorHandler.badRequest(res, 'Search query is required');
    }

    try {
        const tasks = await taskService.searchTask(req.user.id, q);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error searching tasks:', error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.transferTask = async (req, res) => {
    const { email, taskId } = req.body;
     
    if (!email || !taskId) {
        return ErrorHandler.badRequest(res, 'Email and taskId are required');
    }

    try {
        const task = await taskService.transferTask(req.user.id, email, taskId);
        res.status(200).json({ success: true, message: 'Task transferred successfully', task });
    } catch (error) {
        console.error('Error transferring task:', error);
        return ErrorHandler.badRequest(res, error.message);
    }
};