module.exports = function(sequelize, DataTypes) {
    var Articles = sequelize.define("Articles", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        link: DataTypes.STRING
    }, 
    {
        timestamps: false
    });
    return Articles;
};