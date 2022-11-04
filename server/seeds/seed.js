const db = require('../config/connection');
const { Book } = require('../models');

const bookData = require('./books.json');

db.once('open', async () => {
  await Tech.deleteMany({});

  const books = await Tech.insertMany(bookData);

  console.log('books seeded!');
  process.exit(0);
});