import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authMiddleware, jobsRoutes)

const port = 5000

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
app.use((err, req, res, next) => {
    console.log(err)

    if (err.code === 11000) {
        return res.status(400).json({ msg: 'Email already exists' })
    }

    return res.status(500).json({ msg: err.message || 'Something went wrong' })
})
start()