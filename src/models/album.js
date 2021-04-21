const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      album.belongsTo(models.artist);
      album.hasMany(models.tracks)
    }
  };
  album.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    artist: DataTypes.STRING,
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    artist: DataTypes.STRING,
    tracks: DataTypes.STRING,
    self: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'album',
    underscored: true,
  });
  return album;
};
