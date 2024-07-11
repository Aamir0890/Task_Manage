
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id'
            }
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, { foreignKey: 'userId' });
        Task.hasMany(models.Comment, { foreignKey: 'taskId' });
        Task.hasMany(models.Attachment, { foreignKey: 'taskId' });
    };

    return Task;
};
