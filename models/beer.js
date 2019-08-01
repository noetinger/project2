module.exports = function(sequelize, DataTypes) {
  var Beer = sequelize.define("Beer", {
    text: DataTypes.STRING,
    type: DataTypes.TEXT
  });
  return Beer;
};
