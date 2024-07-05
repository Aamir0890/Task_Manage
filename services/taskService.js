const taksRepository=require('../repository/task-repository')

exports.createTask=async(data)=>{
    return await taksRepository.createTask(data)
}
exports.getAllTask=async(data)=>{
     
}
exports.changeTaskStatus=async(id,taskId,status)=>{
    
}