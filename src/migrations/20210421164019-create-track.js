module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tracks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      album_id: {
        type: Sequelize.STRING,
        references: {
          model: 'albums',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.FLOAT
      },
      times_played: {
        type: Sequelize.INTEGER
      },
      artist: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      self: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tracks');
  }
};
