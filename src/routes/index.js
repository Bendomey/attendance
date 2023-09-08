const express = require('express');
const adminRouter = require('./admin');
const staffRouter = require('./staff');
const attendanceRouter = require('./attendance');
const projectRouter = require('./project');

const appRouter = express.Router();

appRouter.get('/', (_, res) =>
  res.status(200).json({ status: true, message: 'All Green' })
);

/**
 * @module Routes
 * @description This section should hold all routes registered.
 */
appRouter.use('/admins', adminRouter);
appRouter.use('/staffs', staffRouter);
appRouter.use('/attendance', attendanceRouter);
appRouter.use('/projects', projectRouter);

module.exports = appRouter;
