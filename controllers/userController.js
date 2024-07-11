const userService=require('../services/userService')
const userSchema=require('../utils/validations/userSchema')

exports.createUser=async(req,res)=>{
    try {
          
          const result=userSchema.safeParse(req.body)
            
          if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
             res.status(400).json({ errors });
          }
          else{
            
            const user=await userService.createUser(req.body)
            res.status(201).json(user)
          }
          
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}


exports.loginUser=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password
        const result = userSchema.pick({ email: true, password: true }).safeParse({ email,password });
        if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
             res.status(400).json({ errors });

          }
      const user=await userService.loginUser(email,password)
        res.status(200).json(user);
       
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


exports.getUserById=async(req,res)=>{
    try {
        const id=req.user.id;
          const user=await userService.getUserById(id);
          res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

exports.updateUser=async(req,res)=>{
    try {
          const id=req.user.id;
          const user=await userService.updateUser(id,req.body)
          res.status(200).json(user)
    } catch (error) {
        res.status(500).json("internal server error");
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const id=req.user.id;
        await userService.deleteUser(id);
        res.status(204).json("User deleted successfully");
    } catch (error) {
        res.status(500).json("internal server error");
    }
}
