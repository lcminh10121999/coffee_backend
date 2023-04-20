'use strict';

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
    // for (let i = 1; i <= 3; i++) {
    //   for (let j = 1; j <= 61; j++) {
    //     data.push({
    //       product_id: j,
    //       size_id: i,
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     });
    //   }
    // }

    // return queryInterface.bulkInsert('size_products', data);
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
