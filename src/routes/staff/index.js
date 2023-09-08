const express = require('express');
const {
  ping,
  getStaff,
  loginStaff,
  getStaffByClockInCode,
  getStaffs,
  createStaff,
} = require('../../services/staffs');
const Validator = require('fastest-validator');
const {
  staffAuthMiddleware,
  adminAuthMiddleware,
} = require('../../utils/middlewares');
const { CONFIG } = require('../../../config');

const v = new Validator();

const staffRouter = express.Router({
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

staffRouter.get('/ping', (_, res) => {
  const response = ping();

  res.status(200).json({
    status: true,
    message: response,
  });
});

// get all staffs
staffRouter.get('/', adminAuthMiddleware, async (_, res) => {
  try {
    const response = await getStaffs();
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

const validateStaffCreationSchema = {
  email: { type: 'email', trim: true },
  username: { type: 'string', trim: true },
  name: { type: 'string', trim: true },
  department: { type: 'string', trim: true },
};
const checkStaffCreationValidation = v.compile(validateStaffCreationSchema);

// create staff
staffRouter.post('/', adminAuthMiddleware, async (req, res) => {
  const validationResult = checkStaffCreationValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await createStaff(req.body);
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

// Get logged in staff
staffRouter.get('/current', staffAuthMiddleware, async (req, res) => {
  try {
    const response = await getStaff({ username: req.user.username });
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

const validateStaffLoginSchema = {
  username: { type: 'string', trim: true },
  password: { type: 'string', trim: true },
};
const checkStaffLoginValidation = v.compile(validateStaffLoginSchema);

// Login as staff
staffRouter.post('/login', async (req, res) => {
  const validationResult = checkStaffLoginValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await loginStaff(req.body);
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

const validateStaffLoginWithCodeSchema = {
  code: {
    type: 'string',
    min: CONFIG.VERFICATION_CODE.LENGTH,
    max: CONFIG.VERFICATION_CODE.LENGTH,
  },
};
const checkStaffLoginWithCodeValidation = v.compile(
  validateStaffLoginWithCodeSchema
);

// Login as staff
staffRouter.post('/login/code', async (req, res) => {
  const validationResult = checkStaffLoginWithCodeValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await getStaffByClockInCode(req.body);
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

module.exports = staffRouter;
