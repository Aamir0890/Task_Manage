const {Sequelize}=require('sequelize')
const config=require('../config/serverConfig')

 const sequelize=new Sequelize(config.DATABASE,config.USER,config.PASSWORD,{
    host:config.HOST,
    dialect:config.DIALECT
 });

 const db={}
 db.sequelize=sequelize;
 db.models={};
 db.models.User=require('./user')(sequelize,Sequelize.DataTypes);
 db.models.Task=require('./task')(sequelize,Sequelize.DataTypes);
 db.models.Comment=require('./comments')(sequelize,Sequelize.DataTypes);
 db.models.Attachment=require('./attachments')(sequelize,Sequelize.DataTypes);
 
 module.exports=db

 
// const UserModel=require('./user')

// const User = UserModel(sequelize, Sequelize.DataTypes);



// const db={
//     sequelize,
//     Sequelize,
//         User
// }

// module.exports=db;

