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
            allowNull: false,
            references: {
                model: 'Tasks', 
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id'
            }
        }
    });

    Attachment.associate = (models) => {
        Attachment.belongsTo(models.Task, { foreignKey: 'taskId' });
        Attachment.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Attachment;
};
