require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app.js');
const { errorConsoleLogger } = require('./middlewares/logger.js');

const mongodbUrl = config.get('mongodbUrl');
const PORT = process.env.PORT || config.get('PORT');
const BASE_PATH = `http://localhost:${PORT}`;

async function start() {
  try {
    await mongoose.connect(mongodbUrl, {
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
