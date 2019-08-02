module.exports = function(sequelize, DataTypes) {
  var Beer = sequelize.define("Beer", {
    beerName: DataTypes.STRING,
    breweryName: DataTypes.STRING,
    addressOne: DataTypes.STRING,
    addressTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    type: DataTypes.STRING,
    abv: DataTypes.DECIMAL,
    where: DataTypes.STRING,
    when: DataTypes.STRING
  });
  return Beer;
};
