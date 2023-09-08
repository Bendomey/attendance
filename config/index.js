exports.CONFIG = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  APP_NAME: 'gnpc-attendance',
  PORT: process.env.PORT ?? 5001,
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/gnpc-dev',
  VERFICATION_CODE: {
    ALPHABET: '0123456789',
    LENGTH: 5,
  },
  JWT_TOKEN_KEY: {
    ADMIN: 'super-duper-admin-key',
    STAFF: 'super-duper-staff-key',
  },
  EMAIL: {
    FROM: process.env.EMAIL_FROM,
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    USERNAME: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD,
  }
};