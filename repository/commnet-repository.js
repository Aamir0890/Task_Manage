const {models:{Comment}}=require('../models')

exports.createComment=async(data)=>{
     return await Comment.create(data)
}

exports.deleteCommnet=async(id)=>{
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      return comment;
    }
    throw new Error('Commnet not found');
}

exports.getAllComment=async(id)=>{
    return await Comment.findAll(
        {
            where:{
                taskId:id
            }
        }
    )
}

