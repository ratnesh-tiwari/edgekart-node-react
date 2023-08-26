// config env file
const dotenv = require('dotenv');
dotenv.config({ path: './server/config.env' });

const app = require('./app');
const mongoose = require('mongoose');

// initializing port and listining to it
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// connecting to db
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));
