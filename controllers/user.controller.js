const { User } = require("../models");
const callback = require('../config/callback');


exports.getUsers = async (req, res, next) => {
    try {
        const data = await User.find().sort({ createdAt: -1 })
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(error, error.message));
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const data = await User.findOne(req.params.id)
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(error, error.message));
    }
};

exports.createUser = async (req, res, next) => {
    const data = new User({ ...req.body });
    try {
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'created'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};


exports.updateUser = async (req, res, next) => {
    try {

        const data = await User.findByIdAndUpdate(req.params.id);
        for (const key in req.body) {
            data[key] = req.body[key];
        }
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'updated'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        res.json(callback.callbackSuccessJson(result, 'deleted'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }

};
