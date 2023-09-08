const express = require('express');
const { ping, getProjects } = require('../../services/projects');
const Validator = require('fastest-validator');

const v = new Validator();

const projectRouter = express.Router({
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

projectRouter.get('/ping', (_, res) => {
  const response = ping();

  res.status(200).json({
    status: true,
    message: response,
  });
});

//get all projects
projectRouter.get('/', async (req, res) => {
  try {
    const response = await getProjects();
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

module.exports = projectRouter;
