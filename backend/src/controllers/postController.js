const postModel = require("../models/postModel");
const { postCreateSchema, postUpdateSchema } = require("../validations/postValidation");
const { isValidId } = require("../validations/userValiation");

const createPost = async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data", data: null })
        }
        const { error, value } = postCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, msg: error.details[0].message, data: null });
        }
        const { title, body, status, geo_location } = data
        const createObj = {
            title: title,
            body: body,
            created_by: req.id,
            status: status,
            geo_location: geo_location
        }
        const post = await postModel.create(createObj)
        return res.status(201).send({ status: true, msg: "Post created successfully", data: post })
    } catch (error) {

        return res.status(500).send({ status: false, msg: "internal server error", data: null })
    }
}
const updatePost = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const ValidId = await isValidId(id)
        if (ValidId.error) {
            return res.status(400).send({ status: false, msg: "please check provide data", data: null })
        }
        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data", data: null })
        }
        const findOnePost = await postModel.findOne({ _id: id })
        if (findOnePost.created_by !== req.id) {
            return res.status(401).send({ status: false, msg: "dont have permission to edit the record", data: null })
        }
       
        const { error, value } = postUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, msg: error.details[0].message, data: null });
        }
        const { title, body, status, geo_location } = data
        const postUpdate = await postModel.findOneAndUpdate({ _id: id }, {
            $set: {
                title: title,
                body: body,
                status: status,
                geo_location: geo_location
            },

        }, { new: true })
        return res.status(201).send({ status: true, msg: "Post updated successfully", data: postUpdate })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error", data: null })
    }
}
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const ValidId = await isValidId(id)
        if (ValidId.error) {
            return res.status(400).send({ status: false, msg: "please check probvide data", data: null })
        }
        const findOnePost = await postModel.findOne({ _id: id })
        if (!findOnePost) {
            return res.status(400).send({ status: false, msg: "post already delete", data: null })
        }
        if (findOnePost.created_by !== req.id) {
            return res.status(401).send({ status: false, msg: "dont have permission to edit the record", data: null })
        }
        const postDelete = await postModel.findByIdAndDelete(id)

        return res.status(200).send({ status: true, msg: "post deleted successfully", data: null })
    } catch (error) {
        return res.status(500).send({ status: false, msg: "internal server error", data: null })
    }
}
const getPostUsingLatitudeLongitude = async (req, res) => {
    const query = req.query
    const allPost = await postModel.find()
    let inActiveCount = 0
    let activeCount = 0
    let filterData = []
    for (let i = 0; i < allPost.length; i++) {

        if (allPost[i].status == "Inactive") {
            inActiveCount = inActiveCount + 1
        }
        if (allPost[i].status == "Active") {
            activeCount = activeCount + 1
        }
        if (query) {
            if (allPost[i].geo_location[0].latitude == (query.latitude) && allPost[i].geo_location[0].longitude == (query.longitude)) {
                await filterData.push(allPost[i])
            }

        }
    }
    if (filterData.length > 0) {
        return res.status(200).send({ status: true, msg: "get post list successfully", activeCount: activeCount, inActiveCount: inActiveCount, data: filterData })
    }
    return res.status(200).send({ status: true, msg: "get post list successfully", activeCount: activeCount, inActiveCount: inActiveCount, data: allPost })
}

module.exports = { createPost, updatePost, deletePost, getPostUsingLatitudeLongitude }