const express=require('express')

const app=express();

const PORT=8000;
const db=require('./models')

app.use(express.json());


db.Sequelize.sync().then(()=>{
    console.log("database connected")
    app.listen(PORT,()=>{
        console.log("App is listening in port 3000");
    })
}).catch((err)=>{
   console.log("unable to connect to database",err)
})
