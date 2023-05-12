const Todocollection = require("../models/todoModel.js");


const GETtodo = async (req, res) => {
    const todos = await Todocollection.find();
    res.json(todos);
};

const ADDtodo = async (req, res) => {
    try {
        const newTodo = {
            input: req.body.input,
        };
        const todos = new Todocollection(newTodo);
        await todos.save();
        res.json(newTodo);
    } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("----------------------------");
    }
};

const DELETEtodo = async (req, res) => {
    try {
        const todos = await Todocollection.deleteOne({
            _id: req.query._id
        });
    } catch (error) {
        console.log("----------------------------");
        console.log(error.message);
        console.log("---------------------------");
    }
};

const UPDATEtodo = async (req, res) => {
    try {
        const todos = await Todocollection.updateOne({
            _id: req.query._id
        }, {
            input: req.body.input
        });
    } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("---------------------------");
    }
};


module.exports = {
    GETtodo,
    ADDtodo,
    DELETEtodo,
    UPDATEtodo,
}