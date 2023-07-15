const mongoose = require('mongoose');
const { CONFIG } = require('../../config');

// Connect to the DB;
module.exports = async function () {
    try {
        const mongooseApp = await mongoose.connect(CONFIG.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB has been connected to successfully');

        return mongooseApp
    } catch (error) {
        console.error('Error occurred while connecting to database');
        throw error;
    }
}