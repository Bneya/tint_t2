'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Create artists
    await queryInterface.bulkInsert('tartists', [
      {
        id: 'tart1',
        name: 'juan',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'tart2',
        name: 'fernando',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Create albums
    await queryInterface.bulkInsert('talbums', [
      {
        id: 'talb1',
        tartist_id: 'tart1',
        name: 'mikazuki',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'talb2',
        tartist_id: 'tart1',
        name: 'smoke and mirrors',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'talb3',
        tartist_id: 'tart2',
        name: 'detrás del sol',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Create tracks
    await queryInterface.bulkInsert('ttracks', [
      {
        id: 'ttrack1',
        talbum_id: 'talb1',
        name: 'anata no eranda',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ttrack2',
        talbum_id: 'talb1',
        name: 'kimi ni todoke',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ttrack3',
        talbum_id: 'talb2',
        name: 'ichi ni san',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ttrack4',
        talbum_id: 'talb2',
        name: 'los picapiedras',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ttrack5',
        talbum_id: 'talb3',
        name: 'don corleone',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ttrack6',
        talbum_id: 'talb3',
        name: 'cuando nos volvamos a encontrar',
        times_played: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ttracks', null, {});
    await queryInterface.bulkDelete('talbums', null, {});
    await queryInterface.bulkDelete('tartists', null, {});
  }
};
