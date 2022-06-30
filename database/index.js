const mongoose = require("mongoose");
const { database_url, database_option } = require("../config/index");

const connection = () => {
    mongoose
        .connect(database_url, database_option)
        .then(() => {
            console.log("Database is running");
        })
        .catch((e) => {
            console.log(e);
        });
};
module.exports = connection;
