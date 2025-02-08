const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, getAllUsers, updateUser, getUserById, deleteUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.get('/allUsers', protect, getAllUsers)

router.put('/allUsers/:id', protect, updateUser)

router.get('/allUsers/:id', protect, getUserById)

router.delete('/allUsers/:id', protect, deleteUser)


module.exports = router