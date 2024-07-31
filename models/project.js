module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Projects'
  });

  Project.associate = (models) => {
    Project.belongsTo(models.Team, { foreignKey: 'teamId' });
    Project.hasMany(models.Task, { foreignKey: 'projectId' });
  };

  return Project;
};