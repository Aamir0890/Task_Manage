module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('incomplete', 'completed'),
      defaultValue: 'incomplete',
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { 
    tableName: 'Tasks'
  });
      
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'assignedTo' });
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
    Task.hasMany(models.Comment, { foreignKey: 'taskId' });
    Task.hasMany(models.Attachment, { foreignKey: 'taskId' });
  };

  return Task;
};