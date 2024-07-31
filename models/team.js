module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'Teams'
  });
  
  Team.associate = (models) => {
    Team.belongsToMany(models.User, { through: models.TeamMembers, foreignKey: 'teamId' });
    Team.hasMany(models.Project, { foreignKey: 'teamId' });
    Team.hasMany(models.TeamMembers, { foreignKey: 'teamId' });
  };
   
  return Team;
};