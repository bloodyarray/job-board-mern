import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Company is required'],
        },
        position: {
            type: String,
            required: [true, 'Position is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'interview', 'declined'],
            default: 'pending',
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'remote'],
            default: 'full-time',
        },
        jobLocation: {
            type: String,
            required: [true, 'Job location is required'],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.model('Job', JobSchema)