const express = require('express');
const { ping, clockIn, clockOut, getAttendances } = require('../../services/attendance');
const Validator = require('fastest-validator');
const { staffAuthMiddleware, adminAuthMiddleware } = require('../../utils/middlewares');
const { isValidObjectId } = require('mongoose');

const v = new Validator();

const attendanceRouter = express.Router({
  strict: true,
});

/**
 * @module ServiceRoutes
 * @description This section holds all registered service routes..
 *
 * What should be in here:
 * 1. Validate params coming in.
 * > Note: You can get access to use client data from `req.params`, `req.body`, `req.query`.
 * 2. Call all your services for a registered route
 */

attendanceRouter.get('/ping', (_, res) => {
  const response = ping();

  res.status(200).json({
    status: true,
    message: response,
  });
});

// get all attendances
attendanceRouter.get('/', adminAuthMiddleware, async (_, res) => {
  try {
    const response = await getAttendances();
    res.status(200).json({
      status: true,
      message: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: false,
        error: error.message,
      });
    }
  }
});

// Clock In
attendanceRouter.post('/', staffAuthMiddleware, async (req, res) => {
  try {
    const response = await clockIn({ username: req.user.username });
    res.status(200).json({
      status: true,
      message: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: false,
        error: error.message,
      });
    }
  }
});

const validateClockoutSchema = {
  briefOfWhatWasDoneForTheDay: 'string|optional',
  workForToday: 'string',
  project: 'string',
  workForTodayStartTime: 'string',
  workForTodayEndTime: 'string',
  workHours: 'string',
};
const checkClockoutValidation = v.compile(validateClockoutSchema);

// Clock Out
attendanceRouter.patch('/', staffAuthMiddleware, async (req, res) => {
  const validationResult = checkClockoutValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  if (!isValidObjectId(req.body.project)) {
    res.status(400).json({
      status: false,
      error: 'Provide ID of project',
    });
  }

  try {
    const response = await clockOut({
      id: req.user.id,
      ...req.body,
    });
    res.status(200).json({
      status: true,
      message: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: false,
        error: error.message,
      });
    }
  }
});

module.exports = attendanceRouter;
