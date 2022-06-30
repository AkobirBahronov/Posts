require('dotenv').config();

module.exports = {
    port: process.env.DEV_PORT,
    database_url: process.env.DATABASE_URL,
    database_option: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
};
