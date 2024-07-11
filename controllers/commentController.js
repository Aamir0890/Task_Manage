const commentService=require('../services/commentService')

exports.createComment=async(req,res)=>{
   req.body.userId=req.user.id;
   try {
    const newComment=await commentService.createCommnet(req.body);
    res.status(201).json(newComment);
   } catch (error) {
    console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
   }
}


exports.getAllComment=async(req,res)=>{
try {
    const body=await commentService.getAllCommnet(req.body.id);
    if(!body){
        res.status(404).json({ error: 'task not found for id'});
    }
    res.status(200).json(body);
} catch (error) {
    console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
}
}

exports.deleteComment=async(req,res)=>{
    try {
        const body=await commentService.deleteComment(req.body.id);
        if(!body){
            res.status(404).json({ error: 'comment not found'});
        }
        res.status(200).json(body);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}


