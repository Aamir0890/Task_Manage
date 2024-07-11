const userController=require('../../controllers/userController')
const taskController=require('../../controllers/taskController')
const commentController=require('../../controllers/commentController')
const attachmentController=require('../../controllers/attachmentController')
const authenticate=require('../../middleware/authentication')
const express=require('express')
const router=express.Router();


router.post('/user/login',userController.loginUser)
router.post('/user/register',userController.createUser)
router.use(authenticate)
router.get('/user/:id',userController.getUserById)
router.put('/user',userController.updateUser)
router.delete('/user',userController.deleteUser)


router.get('/task',taskController.getAllTask)
router.post('/task/create',taskController.createTask)
router.put('/task/update',taskController.updateTask)
router.get('/filterTask',taskController.filterTask)
router.get('/search',taskController.searchTask)
router.put('/transferTask',taskController.transferTask);



router.get('/comment',commentController.getAllComment);
router.post('/comment',commentController.createComment);
router.delete('/comment',commentController.deleteComment)

router.get('/attachment',attachmentController.getAllAttachment);
router.post('/attachment',attachmentController.createAttachment);
router.delete('/attachment',attachmentController.deleteAttachment)


module.exports=router