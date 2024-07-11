const taksRepository=require('../repository/task-repository')
const userRepository=require('../repository/user-repository')
const transporter=require('../utils/mail/mail')
require('dotenv').config();

exports.createTask=async(data)=>{
    return await taksRepository.createTask(data)
}

exports.getAllTask=async(id)=>{
   
     return await taksRepository.getAllTask(id)
}

exports.changeTaskStatus=async(id,taskId,status)=>{
     return await taksRepository.updateTask(taskId,status)
}

exports.filterTask=async(userId,status)=>{
    return await taksRepository.filterTask(userId,status);
}

exports.searchTask=async(userId,searchItem)=>{
    return await taksRepository.searchTasks(userId,searchItem)
}


exports.transferTask=async(userId,email,taskId)=>{
    
     const getUser=await userRepository.getUserByEmail(email);
    
     if(!getUser){
        throw new Error('New assignee not found');
     }
     
     const id=await taksRepository.getTaskById(taskId);
     
     if(!id||id.dataValues.userId!=userId){
        throw new Error('User not alowd to changge the task');
     }
     if(userId===getUser.dataValues.id){
        throw new Error('User already assigned the task');
     }
     const tranfer=await taksRepository.transferTask(taskId,getUser.dataValues.id);
     if(tranfer){
        const mailOptions = {
            from: process.env.USER,
            to:email,
            subject: 'Task transfer notification',
            text: `Hello ${email},\n\nTask with ${taskId}has been successfully updated to you.\n\nTask detailes ${tranfer}`,
          };
          await transporter.sendMail(mailOptions);
     }
     return tranfer;     
}



