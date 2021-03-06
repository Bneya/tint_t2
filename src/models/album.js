const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      talbum.belongsTo(models.tartist, { onDelete: 'cascade' });
      talbum.hasMany(models.ttrack)
    }
  };
  talbum.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tartist_id: DataTypes.STRING,
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: DataTypes.STRING,
    tracks: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'talbum',
    underscored: true,
  });
  return talbum;
};
