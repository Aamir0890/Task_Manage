const {models:{Comment}}=require('../models')

exports.createComment=async(data)=>{
     return await Comment.create(data)
}


exports.findComment = async (commentId) => {
    return await Comment.findByPk(commentId);
};

exports.getAllComment=async(id)=>{
    return await Comment.findAll({where:{taskId:id}})
    
}
exports.deleteComment = async (comment) => {
    await comment.destroy();
    return true;
};