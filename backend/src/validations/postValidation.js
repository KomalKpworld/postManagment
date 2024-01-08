const Joi = require('joi')
const mongoose = require('mongoose');

const postCreateSchema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    status: Joi.string(),
    status: Joi.string().valid('Active', 'Inactive'),
    geo_location: Joi.array()
        .items({
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
        })
});

const postUpdateSchema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    status: Joi.string().valid('Active', 'Inactive'),
    geo_location: Joi.array()
        .items({
            latitude: Joi.string(),
            longitude: Joi.string(),
        })
});



module.exports = { postCreateSchema, postUpdateSchema, }