module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'Comments'
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Task, { foreignKey: 'taskId' });
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Comment;
  };