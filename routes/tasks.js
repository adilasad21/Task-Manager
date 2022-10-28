const express = require('express')
const router = express.Router()

const { getAllTasks, 
    createTasks,
    getTask,
    updateTasks,
    deleteTasks,} = require('../controller/tasks')

router.get('/', getAllTasks)
router.post('/', createTasks)
router.get('/:id', getTask)
router.patch('/:id', updateTasks)
router.delete('/:id', deleteTasks)


module.exports = router
