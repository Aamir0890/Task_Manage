const { where } = require('sequelize')
const {models:{Attachment}}=require('../models')

exports.createAttachment=async(data)=>{
    return Attachment.create(data)
}
exports.deleteAttachment=async(id)=>{
    const attachment=await Attachment.findByPk(id)
    if(attachment){
        await attachment.destroy
        return attachment
    }
    throw new Error('attachment not found');
}

exports.getAllAttachment=async(id)=>{
             return await Attachment.findAll({
        where:{
            taskId:id
        }
    })

}
