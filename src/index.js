const { CONFIG } = require('../config');
const express = require('express');
const cors = require('cors');

const appRouter = require('./routes');

module.exports = async function () {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Connect to DB
  await require('./db')();

  app.use('/api', appRouter);

  app.use((err, req, res, next) => {
    const { message } = err;

    return res.status(500).json({ error: message, success: false });
  });

  app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on http://localhost:${CONFIG.PORT}`);
  });
};
