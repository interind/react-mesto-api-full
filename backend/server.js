require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app.js');
const { errorConsoleLogger } = require('./middlewares/logger.js');

const PORT = process.env.PORT || config.get('PORT');
const mongoUrl = process.env.MONGO || config.get('mongodbUrl');
const BASE_PATH = `Port:${PORT}`;

async function start() {
  try {
    await mongoose.connect(mongoUrl, {
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
