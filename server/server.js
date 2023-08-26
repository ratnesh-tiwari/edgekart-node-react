// handling uncaughtException error
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 💥💥💥💥 Shutting down...');
  console.log(err.name, err.message);
  // giving server sometime to finish all pending request rather than crashing immediatly
  server.close(() => {
    process.exit(1);
  });
});

// configuring .env file
const dotenv = require('dotenv');
dotenv.config({ path: './server/config.env' });

const app = require('./app');
const mongoose = require('mongoose');

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
