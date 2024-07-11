
module.exports=(sequelize,DataTypes)=>{
 
    const User=sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    User.associate = (models) => {
        User.hasMany(models.Task, { foreignKey: 'userId' });
        User.hasMany(models.Comment, { foreignKey: 'userId' });
        User.hasMany(models.Attachment, { foreignKey: 'userId' });
    };
    
    return User
}


