module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ttracks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      talbum_id: {
        type: Sequelize.STRING,
        references: {
          model: 'talbums',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('ttracks');
  }
};
