const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})



const createTasks = asyncWrapper( async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if (!task) {
            // another way to handle errors
            // const error = new Error('Not found')  
            // error.status = 404
            // return next(error)
            return next(createCustomError(`No such id:${taskID} exist`,404))
    
        }
        res.status(200).json({task})
})

const updateTasks = asyncWrapper(async (req, res) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new: true, // to make sure new data must be output
            runValidators:true,// to run validators on the new data
        })
        if (!task) {
            return next(createCustomError(`No such id:${taskID} exist`,404))
        }
        res.status(200).json({task})
})

const deleteTasks = asyncWrapper(async (req, res) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task) {
            return next(createCustomError(`No such id:${taskID} exist`,404))
        }
         res.status(200).json({task})
})



module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTasks,
    deleteTasks
}