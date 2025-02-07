const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Task = require('../models/taskModel')


// @desc Create a new task, only admin can do it
// @route GET /api/tasks
// @access Only admin

const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority, assignedUser } = req.body;
    
    const userAdmin = await User.findById(req.user.id);
   
    if (!userAdmin.isAdmin) {
          res.status(403);
          throw new Error('Not authorized, only Admin can create a task');
      }
      
      if(!title || !description || !dueDate || !priority ){
        res.status(400)
        throw new Error('Please include all fields')
    }
    // Checking if assigned user exists
    const user = await User.findById(assignedUser);
    if (!user) {
        res.status(404);
        throw new Error("Assigned user not found");
    }

    // Create a new task
    const task = await Task.create({
        title,
        description,
        dueDate,
        priority,
        assignedUser,
    });

    res.status(201).json(task);
});

// @desc get the tasks related to a particular user, and admin can see all the tasks
// @route GET /tasks
// @access > private, admin can view all taks, user can only view tasks assigned to the user
const getUserTasks = asyncHandler(async (req, res) => {

     let tasks;

    if (req.user.isAdmin) {
        // If user is an admin, fetch all tasks
        tasks = await Task.find();
    } else {
        // If user is a normal user we fetch only their assigned tasks 
        tasks = await Task.find({ assignedUser: req.user.id });
    }

    res.status(200).json(tasks);
});

// @desc Get an individual task
// @route GET /api/tasks/:id
// @access Private (Admin can fetch any task, users can fetch only their own)
const getIndividualTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // If user is not an admin and is not assigned to this task, deny access
    if (!req.user.isAdmin && task.assignedUser.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to view this task');
    }

    res.status(200).json(task);
})


// @desc Update a task 
// @route PUT /api/tasks/:id
// @access Private (Admin can update any task, Users can only update their assigned tasks)
const updateTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, status, priority, assignedUser } = req.body;
    const task = await Task.findById(req.params.id);

    // if(!title || !description || !dueDate || !priority ){
    //     res.status(400)
    //     throw new Error('Please include all fields')
    // }

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Only admin can update any task, normal users can only update their assigned tasks
    if (!req.user.isAdmin && task.assignedUser.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to update this task');
    }

    // Update only the provided fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
});


// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Private (Admins can delete any task, Users can only delete their assigned tasks)
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    
    if (!req.user.isAdmin) {
        res.status(403);
        throw new Error("Not authorized to delete this task, only admin can delete the task");
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
});



module.exports = {
   createTask,
   getUserTasks,
   getIndividualTask,
   updateTask,
   deleteTask
}