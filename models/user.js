module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Users'
    });
  
    User.associate = (models) => {
      User.belongsToMany(models.Team, { through: models.TeamMembers, foreignKey: 'userId' });
      User.hasMany(models.Task, { foreignKey: 'assignedTo' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
      User.hasMany(models.Attachment, { foreignKey: 'userId' });
      User.hasMany(models.TeamMembers, { foreignKey: 'userId', as: 'TeamMemberships' });
    };
    
    return User;
  };