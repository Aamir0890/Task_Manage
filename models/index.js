const sequelize=require('sequelize')
const Sequelize=require('../config/serverConfig')


const User=require('./user')

const db={
    sequelize,
    Sequelize,
    models:{
        User
    }
}
module.exports=db;
