const express = require('express');
const { ping, getStaff } = require('../../services/staffs');
const Validator = require('fastest-validator');

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

staffRouter.get('/', (_, res) => {
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

// Validate a staff's username
staffRouter.get('/:username', async (req, res) => {
  const validationResult = checkUsernameValidation(req.params);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }
  
  try {
    const response = await getStaff(req.params);
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
