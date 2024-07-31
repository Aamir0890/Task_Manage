const taksRepository=require('../repository/task-repository')
const userRepository=require('../repository/user-repository')
const teamRepository=require('../repository/team-repository')
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


exports.transferTask = async (userId, email, taskId) => {
   
    const getUser = await userRepository.getUserByEmail(email);
    
    if (!getUser) {
        throw new Error('New assignee not found');
    }
    
    
    const task = await taksRepository.getTaskById(taskId);
      console.log(task.assignedTo)
    if (!task || task.assignedTo != userId) {
        throw new Error('User not allowed to change the task');
    }
    
    if (userId === getUser.id) {
        throw new Error('User already assigned the task');
    }
    
     
    const taskTeam = await teamRepository.findTeamById(taskId);
    
    
    const isUserInTeam = await teamRepository.findTeamMember(getUser.dataValues.id, taskTeam.id);
   
    if (!isUserInTeam) {
        throw new Error('New assignee is not in the same team');
    }
    console.log(getUser.id)
    // Transfer the task
    const transfer = await taksRepository.transferTask(taskId, getUser.id);
    
    // if (transfer) {
    //     const mailOptions = {
    //         from: process.env.USER,
    //         to: email,
    //         subject: 'Task transfer notification',
    //         text: `Hello ${email},\n\nTask with ID ${taskId} has been successfully assigned to you.\n\nTask details: ${JSON.stringify(transfer)}`,
    //     };
    //     await transporter.sendMail(mailOptions);
    // }
    
    return transfer;     
}



