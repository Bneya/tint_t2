module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talbums', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      tartist_id: {
        type: Sequelize.STRING,
        references: {
          model: 'tartists',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      tracks: {
        type: Sequelize.STRING
      },
      self: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('talbums');
  }
};
