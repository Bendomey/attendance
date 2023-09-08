const express = require('express');
const { ping, loginAdmin, getAdmin } = require('../../services/admins');
const Validator = require('fastest-validator');
const { adminAuthMiddleware } = require('../../utils/middlewares');

const v = new Validator();

const adminRouter = express.Router({
  strict: true,
});

adminRouter.get('/ping', (_, res) => {
  const response = ping();

  res.status(200).json({
    status: true,
    message: response,
  });
});


const validateLoginAdminSchema = {
  username: { type: 'string', trim: true },
  password: { type: 'string', trim: true },
};
const checkLoginAdminValidation = v.compile(validateLoginAdminSchema);

// Login as an admin
adminRouter.post('/login', async (req, res) => {
  const validationResult = checkLoginAdminValidation(req.body);
  if (validationResult !== true) {
    return res.status(400).json({
      status: false,
      error: validationResult,
    });
  }

  try {
    const response = await loginAdmin(req.body);
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

// Get current admin
adminRouter.get('/current', adminAuthMiddleware, async (req, res) => {
  try {
    const response = await getAdmin({
      id: req.user.id,
    });

    res.status(200).json({
      status: true,
      message: response,
    });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      res.status(400).json({
        status: false,
        error: error.message,
      });
    }
  }
});

module.exports = adminRouter;
