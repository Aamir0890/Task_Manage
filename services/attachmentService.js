const attachmentRepository=require('../repository/attachment')
const taskRepository=require('../repository/task-repository')

exports.createAttachment=async(data)=>{
    const task=data.taskId;
    const id=data.userId;
    const user=await taskRepository.getTaskById(task)
   
    if(user.assignedTo!=id){
        throw new Error("User not able to create attachment as task not assigned")
    }
    console.log(data)
    const attachment = await attachmentRepository.createAttachment(data);
    return attachment
}


exports.getAllAttachment=async(taskId)=>{
    
    return await attachmentRepository.findAllAttachment(taskId)
}

exports.deleteAttachment=async(id,userId)=>{
    const attachment=await attachmentRepository.findAttachment(id)
    if (!attachment) {
        return { success: false, message: 'attachemnt not found' };
    }

   if(attachment.userId!=userId){
    throw new Error("User not allowed as delete commnet")
   }

  await attachmentRepository.deleteAttachment(attachment);
  return { success: true, message: 'Comment deleted successfully' };
}

 