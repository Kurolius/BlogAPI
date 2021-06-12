'use strict';
const faker = require('faker');
const { Article, sequelize } = require('../models');
const { User } = require('../models');
const { Tag } = require('../models');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users',
     [...Array(20)].map((user) => (
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(8),
        role: faker.helpers.randomize(['guest', 'admin', 'author']),
        createdAt: faker.date.between('2000-01-01', '2021-12-31'),
        updatedAt: new Date()
      }
    )) , {});
    console.log('Users DONE');

    const mfs = await User.findAll({
      attributes: ['id']
    });

    await queryInterface.bulkInsert('Articles',
      [...Array(200)].map((Article) => (
        {
          title: faker.name.title(),
          content: faker.lorem.paragraphs(2),
          published: 1,
          UserId: faker.random.arrayElement(JSON.parse(JSON.stringify(mfs))).id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      , {});
    console.log('Articles DONE');

    await queryInterface.bulkInsert('Tags',
      [...Array(10)].map((Tag) => (
        {
          name: faker.lorem.sentence(3, 3),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      , {});
    console.log('Tags DONE');

    const mfs_articles = await Article.findAll({
      attributes: ['id']
    });

    //console.log(faker.random.arrayElement(JSON.parse(JSON.stringify(mfs_articles))).id);

    await queryInterface.bulkInsert('Comments',
      [...Array(2000)].map((Comment) => (
        {
          content: faker.lorem.lines(faker.datatype.number({ 'min': 1, 'max': 4 })),
          ArticleId: faker.random.arrayElement(JSON.parse(JSON.stringify(mfs_articles))).id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      , {});
    console.log('Comments DONE');

    const mfs_tags = await Tag.findAll({
      attributes: ['id']
    });


    var art_last = JSON.parse(JSON.stringify(mfs_articles)).length - 1
    var tag_last = JSON.parse(JSON.stringify(mfs_tags)).length - 1

    console.log('Adding ArticleTags... (This will take a while)');
    for (var i = 0; i <= art_last; i++) {
      for (var j = 0; j <= tag_last; j++) {
        await queryInterface.bulkInsert('ArticleTags', [{
          ArticleId: JSON.parse(JSON.stringify(mfs_articles))[i].id,
          Tagid: JSON.parse(JSON.stringify(mfs_tags))[j].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {})
      }
    };
    console.log('ArticleTags DONE');

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