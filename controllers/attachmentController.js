const attachmentService=require('../services/attachmentService')

exports.createAttachment=async(req,res)=>{
    req.body.userId=req.user.id;
  try {
    const newComment=await attachmentService.createAttachment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
}

exports.getAllAttachment=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await attachmentService.getAllCommnet(id)
        res.status(200).json(data);
    } catch (error) {
        console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
    }
}

exports.deleteAttachment=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await attachmentService.deleteComment(id);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
    }
}