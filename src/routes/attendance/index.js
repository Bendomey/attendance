const express = require('express');
const { ping, clockIn, clockOut } = require('../../services/attendance');
const Validator = require('fastest-validator');
const { CONFIG } = require('../../../config');

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

attendanceRouter.get('/', (_, res) => {
  const response = ping();

  res.status(200).json({
    status: true,
    message: response,
  });
});

const validateUsernameSchema = {
  username: { type: 'string', trim: true },
};
const checkUsernameValidation = v.compile(validateUsernameSchema);

// Clock In
attendanceRouter.post('/', async (req, res) => {
  const validationResult = checkUsernameValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await clockIn(req.body);
    // console.log(response);
    // return 
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
  code: {
    type: 'string',
    min: CONFIG.VERFICATION_CODE.LENGTH,
    max: CONFIG.VERFICATION_CODE.LENGTH,
  },
  briefOfWhatWasDoneForTheDay: 'string|optional',
};
const checkClockoutValidation = v.compile(validateClockoutSchema);

// Clock Out
attendanceRouter.patch('/', async (req, res) => {
  const validationResult = checkClockoutValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await clockOut(req.body);
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
