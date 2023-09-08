exports.CONFIG = {
  NODE_ENV: 'development',
  APP_NAME: 'gnpc-attendance',
  PORT: 5001,
  MONGO_URI: 'mongodb://localhost:27017/gnpc-dev',
  VERFICATION_CODE: {
    ALPHABET: '0123456789',
    LENGTH: 5,
  },
  JWT_TOKEN_KEY: {
    ADMIN: 'super-duper-admin-key',
    STAFF: 'super-duper-staff-key',
  },
};
