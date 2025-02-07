const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)


// router.post('/login', (req, res) => {
//     res.send('Login Route')
// })

module.exports = router