const commentRepository=require('../repository/commnet-repository')
const taskRepository=require('../repository/task-repository')

exports.createCommnet=async(data)=>{
    const task=data.taskId;
    const id=data.userId;
    const user=await taskRepository.getTaskById(task)
    if(user.assignedTo!=id){
        throw new Error("User not able to create comment as task not assigned")
    }
    await commentRepository.createComment(data)
}

exports.getAllCommnet=async(taskId)=>{
     
    const data=await commentRepository.getAllComment(taskId)
    
    return data
}

exports.deleteComment = async (commentId, userId) => {
   
    const comment = await commentRepository.findComment(commentId);
    
    if (!comment) {
        return { success: false, message: 'Comment not found' };
    }

    if (comment.userId !== userId) {
        return { success: false, message: 'You do not have permission to delete this comment' };
    }

    await commentRepository.deleteComment(comment);
    return { success: true, message: 'Comment deleted successfully' };
};