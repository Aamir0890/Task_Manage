const taskService=require('../services/taskService')
const {taskSchema,updateStatusSchema}=require('../utils/validations/taskSchema')


exports.createTask=async(req,res)=>{
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    const data=req.body;
    data.status=req.body.status||'incomplete'
    data.userId= req.user.id
    try {
        const task=await taskService.createTask(data)
        res.status(201).json({ message: 'Task created successfully', task });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
   
exports.getAllTask=async(req,res)=>{
    
    try {
        const task=await taskService.getAllTask(req.user.id);
        return res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.updateTask=async(req,res)=>{
    const { id } = req.params;
    const { status } = req.body;
    const validation = updateStatusSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ errors: validation.error.errors });
    }
     
    try {
        const task = await taskService.changeTaskStatus(id, req.user.id, status);
        res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

