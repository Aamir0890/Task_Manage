
const {models:{Attachment}}=require('../models')


exports.createAttachment = async (data) => {
    return await Attachment.create(data);
};

exports.findAttachment = async (attachmentId) => {
    return await Attachment.findByPk(attachmentId);
};

exports.findAllAttachment=async(id)=>{
    return await Attachment.findAll({where:{taskId:id}})
}

exports.deleteAttachment = async (attachment) => {
    await attachment.destroy(attachment);
    return true;
};
