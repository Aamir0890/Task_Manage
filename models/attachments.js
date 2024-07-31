module.exports = (sequelize, DataTypes) => {
    const Attachment = sequelize.define('Attachment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      filePath: {
        type: DataTypes.STRING,
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
      tableName: 'Attachments'
    });
  
    Attachment.associate = (models) => {
      Attachment.belongsTo(models.Task, { foreignKey: 'taskId' });
      Attachment.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Attachment;
  };