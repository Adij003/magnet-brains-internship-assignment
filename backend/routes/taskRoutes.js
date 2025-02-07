const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


const { createTask, getUserTasks, getIndividualTask, updateTask, deleteTask} = require('../controllers/taskController')

    router.post('/', protect, createTask)
    router.get('/', protect, getUserTasks)
    router.get('/:id', protect, getIndividualTask)
    router.put('/:id', protect, updateTask)
    router.delete('/:id', protect, deleteTask)


module.exports = router
