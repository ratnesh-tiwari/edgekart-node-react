// configuring .env file
const dotenv = require('dotenv');
dotenv.config({ path: './server/config.env' });
const Product = require('./models/productModel');

const data = require('../../myntra_fashion_products_free_dataset.json');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connecting to db
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const genDiscount = (price) => {
  price = (price * 3) / 4;
  const randomnum = Math.random();
  return price * randomnum;
};

const genStock = () => {
  const randomnum = Math.random() * 1000 + 1;
  return Math.round(randomnum);
};

app.get('/', async (req, res) => {
  await Product.deleteMany({});
  console.log('All doc delete');
  const value = data.map((element) => {
    let { name, price, brand, description, images, gender } = element;
    const discount = Math.round(genDiscount(price));
    const stock = genStock();
    images = images.split('~').map((el) => el.trim());
    const category = 'fashion';
    return {
      name,
      price,
      discount,
      images,
      stock,
      category,
      brand,
      description,
      gender,
    };
  });

  await Product.create(value.map((el) => el));

  console.log('All doc uploaded');

  res.json({ sucess: 'done' });
});

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected');
  });

// initializing port and listining to it
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// handling unhandledRejection error
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! 💥💥💥💥 Shutting down...');
  console.log(err.name, err.message);
  // giving server sometime to finish all pending request rather than crashing immediatly
  server.close(() => {
    process.exit(1);
  });
});
