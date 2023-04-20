'use strict';
const { faker } = require('@faker-js/faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // var data = [];
    // for (let index = 0; index < 100; index++) {
    //   data.push({
    //     name: faker.name.fullName(),
    //     birthday: faker.date.birthdate(),
    //     gender: Math.floor(Math.random() * 3),
    //     phone: faker.phone.phoneNumber(),
    //     address: faker.address.city(),
    //     status: Math.floor(Math.random() * 3),
    //     role: Math.floor(Math.random() * 3),
    //     image: faker.image.avatar(),
    //     email: faker.internet.email(),
    //     password: '$2a$10$Qjph.VGitZ1e6X01hKor4eQQ5anziIHxos3OS3tyEOalV7BK7XT96',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   });

    // }

    // return queryInterface.bulkInsert('users', data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
