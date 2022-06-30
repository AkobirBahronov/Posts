const chalk = require("chalk");

exports.errorHandler = (err, req, res, next) => {
    console.log(chalk.red.underline(err));
    return res.status(err.status).json({ error: err.message });
}