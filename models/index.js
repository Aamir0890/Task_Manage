const { Sequelize } = require('sequelize')
const config = require('../config/serverConfig')

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

const db = {}
db.sequelize = sequelize;
db.models = {};

// Import models
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Team = require('./team')(sequelize, Sequelize.DataTypes);
db.models.TeamMembers = require('./teamMember')(sequelize, Sequelize.DataTypes);
db.models.Project = require('./project')(sequelize, Sequelize.DataTypes);
db.models.Task = require('./task')(sequelize, Sequelize.DataTypes);
db.models.Comment = require('./comments')(sequelize, Sequelize.DataTypes);
db.models.Attachment = require('./attachments')(sequelize, Sequelize.DataTypes);

// Call associate function for each model
Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;
 
// const UserModel=require('./user')

// const User = UserModel(sequelize, Sequelize.DataTypes);



// const db={
//     sequelize,
//     Sequelize,
//         User
// }

// module.exports=db;

