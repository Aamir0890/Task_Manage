const attachmentRepository=require('../repository/attachment')
const taskRepository=require('../repository/task-repository')

exports.createCommnet=async(data)=>{
    const task=data.taskId;
    const id=data.userId;
    const user=await taskRepository.getTaskById(task)
    if(user.dataValues.userId!=id){
        throw new Error("User not able to create comment as task not assigned")
    }
    await attachmentRepository.createAttachment(data)
}
exports.getAllCommnet=async(taskId)=>{
    
    await attachmentRepository.getAllAttachment(taskId)
}

exports.deleteComment=async(id,userId)=>{
    const user=await commentRepository.getTaskById(id)
   if(user.dataValues.userId!=userId){
    throw new Error("User not allowed as delete commnet")
   }
    await attachmentRepository.deleteAttachment(id);
}

