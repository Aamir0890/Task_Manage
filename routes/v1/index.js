const userController=require('../../controllers/userController')
const authenticate=require('../../middleware/authentication')
const express=require('express')
const router=express.Router();


router.post('/user/login',userController.loginUser)
router.post('/user/register',userController.createUser)
router.get('/user/:id',authenticate,userController.getUserById)
router.put('/user',authenticate,userController.updateUser)
router.delete('/user',authenticate,userController.deleteUser)



module.exports=router