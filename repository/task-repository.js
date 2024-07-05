
const {models:{Task}}=require('../models')

exports.createTask=async(data)=>{
return await Task.create(data)
}

exports.getAllTask=async(id)=>{
    return await Task.findAll({
        where:{userId:id}
    })
}

exports.updateTask=async(id,taskId,status)=>{
    const task = await Task.findOne({
        where: { id: taskId, userId }
    });

    if (!task) {
        throw new Error('Task not found');
    }

    task.status = status;
    await task.save();
    return task;
};

