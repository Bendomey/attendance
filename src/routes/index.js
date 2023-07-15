const express = require('express');
const staffRouter = require('./staff');
const attendanceRouter = require('./attendance');

const appRouter = express.Router();

appRouter.get('/', (_, res) =>
  res.status(200).json({ status: true, message: 'All Green' })
);

/**
 * @module Routes
 * @description This section should hold all routes registered.
 */
appRouter.use('/staffs', staffRouter);
appRouter.use('/attendance', attendanceRouter);

module.exports = appRouter;
