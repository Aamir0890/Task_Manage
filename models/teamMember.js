module.exports = (sequelize, DataTypes) => {
  const TeamMembers = sequelize.define('TeamMembers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'TeamMembers',
    timestamps: false
  });

  TeamMembers.associate = (models) => {
    TeamMembers.belongsTo(models.Team, { foreignKey: 'teamId' });
  
    TeamMembers.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  };

  return TeamMembers;
};