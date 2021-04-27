'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ttrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ttrack.belongsTo(models.talbum, { onDelete: 'cascade' });
    }
  };
  ttrack.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    talbum_id: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.FLOAT,
    times_played: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ttrack',
    underscored: true,
  });
  return ttrack;
};
