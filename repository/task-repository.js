
const {models:{Task}}=require('../models')
const {Op}=require('sequelize')

exports.createTask=async(data)=>{
return await Task.create(data)
}

exports.getTaskById=async(id)=>{

           return await Task.findByPk(id);
}

exports.getAllTask=async(id)=>{
    return await Task.findAll({
        where:{userId:id}
    })
}


exports.updateTask=async(taskId,status)=>{
    const task = await Task.findOne({
        where: { id: taskId }
    });
    
    if (!task) {
        throw new Error('Task not found');
    }

    task.status = status;
    await task.save();
    return task;
};

exports.filterTask=async(userId,status)=>{
    const whereClause = { userId };
  
    if (status === 'completed' || status === 'incomplete') {
      whereClause.status = status;
    }
    
    return await Task.findAll({
      where: whereClause
    });

}

exports.searchTasks = async (userId, searchTerm) => {
    return await Task.findAll({
      where: {
        userId,
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { description: { [Op.like]: `%${searchTerm}%` } }
        ]
      }
    });
  };
  
  
  exports.transferTask=async(taskId,id)=>{
    const task = await Task.findOne({
      where: { id: taskId }
  });
  
  if (!task) {
      throw new Error('Task not found');
  }
  
  task.userId=id;
  await task.save();
  return task;
  }

