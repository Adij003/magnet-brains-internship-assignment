const express = require('express')
const colors = require('colors')

const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

connectDB()
 

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to the support desk API'})
}) 

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

