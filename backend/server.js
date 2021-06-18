require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');
const { errorConsoleLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || config.get('PORT');
const MONGO = process.env.MONGO_BASE;
const BASE_PATH = `Port:${PORT}`;

async function start() {
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`the server is running at ${BASE_PATH}`);
    });
  } catch (err) {
    errorConsoleLogger(err);
    process.exitCode = 1;
  }
}

start();
