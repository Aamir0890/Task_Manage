const userController=require('../../controllers/userController')
const taskController=require('../../controllers/taskController')
const commentController=require('../../controllers/commentController')
const teamController=require('../../controllers/teamController')
const attachmentController=require('../../controllers/attachmentController')
const projectController=require('../../controllers/projectController')
const authenticate=require('../../middleware/authentication')
const express=require('express')
const router=express.Router();


router.post('/user/login',userController.loginUser)
router.post('/user/register',userController.createUser)
router.use(authenticate)
router.get('/user/:id',userController.getUserById)
router.put('/user',userController.updateUser)
router.delete('/user',userController.deleteUser)


router.post('/team/register',teamController.createTeam)
router.post('/team/invite',teamController.inviteToTeam)
router.get('/team/:id',teamController.getTeamMembers)

router.post('/project',projectController.createProject)

router.get('/task',taskController.getAllTask)
router.post('/task/create',taskController.createTask)
router.put('/task/update/:id',taskController.updateTask)
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