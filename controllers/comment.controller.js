const { Comment } = require("../models");
const callback = require('../config/callback');

exports.getCommentsByPosts = async (req, res, next) => {
    try {
        const data = await Comment.find({ post_ID: req.params.post_ID }).sort({ createdAt: -1 })
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(error, error.message));
    }
};

exports.getComment = async (req, res, next) => {
    try {
        const data = await Comment.findById(req.params.id)
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};

exports.createComment = async (req, res, next) => {

    console.log(req.params.post_ID);

    const data = new Comment({ ...req.body, post_ID: req.params.post_ID });
    try {
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'created'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};


exports.updateComment = async (req, res, next) => {
    try {

        const data = await Comment.findByIdAndUpdate(req.params.id);
        for (const key in req.body) {
            data[key] = req.body[key];
        }
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'updated'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const result = await Comment.findByIdAndDelete(req.params.id);
        res.json(callback.callbackSuccessJson(result, 'deleted'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }

};
