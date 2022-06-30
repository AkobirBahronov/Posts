const { Post } = require("../models");
const path = require('path');
const fs = require('fs');
const callback = require('../config/callback');

exports.getPosts = async (req, res, next) => {
    try {
        const data = await Post.find().sort({ createdAt: -1 })
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(error, error.message));
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const data = await Post.findOne(req.params.id)
        res.json(callback.callbackSuccessJson(data, 'received'));
    } catch (err) {
        res.json(callback.callbackErrorJson(error, error.message));
    }
};

exports.createPosts = async (req, res, next) => {
    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
        const { filename } = item;
        arrayFiles.push(filename);
    }
    try {
        const data = await Post.create({ ...req.body, images: arrayFiles });
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'created'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};


exports.updatePost = async (req, res, next) => {
    const allFiles = req.files;
    const arrayFiles = [];
    for (let item of allFiles) {
        const { filename } = item;
        arrayFiles.push(filename);
    }
    try {
        const { images } = await Post.findById(req.params.id).select({
            images: 1,
        });

        images.forEach((filesLink) => {
            const dataPath = path.join(
                __dirname,
                `../public/uploads/posts/${filesLink}`
            );
            fs.unlink(dataPath, (err) => {
                [];
            });
        });

        const data = await Post.findByIdAndUpdate(req.params.id);
        for (const key in req.body) {
            data[key] = req.body[key];
        }
        data.files = arrayFiles;
        const result = await data.save();
        res.json(callback.callbackSuccessJson(result, 'updated'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { images } = await Post.findById(req.params.id).select({
            images: 1,
        });

        console.log(images);

        images.forEach((filesLink) => {
            const dataPath = path.join(
                __dirname,
                `../public/uploads/posts/${filesLink}`
            );
            fs.unlink(dataPath, (err) => {
                [];
            });
        });

        const result = await Post.findByIdAndDelete(req.params.id);
        res.json(callback.callbackSuccessJson(result, 'deleted'));
    } catch (err) {
        res.json(callback.callbackErrorJson(err, err.message));
    }

};
