import Job from '../models/Job.js'

export const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search, page = 1, limit = 10 } = req.query

    const queryObject = {
        createdBy: req.user.userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }

    let result = Job.find(queryObject)

    if (sort === 'oldest') {
        result = result.sort('createdAt')
    } else if (sort === 'a-z') {
        result = result.sort('position')
    } else if (sort === 'z-a') {
        result = result.sort('-position')
    } else {
        result = result.sort('-createdAt')
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    result = result.skip(skip).limit(limitNumber)

    const jobs = await result
    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limitNumber)

    res.status(200).json({ jobs, totalJobs, numOfPages })
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(201).json({ job })
}

export const updateJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: req.user.userId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
    }

    res.status(200).json({ job })
}

export const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: req.user.userId,
    })

    if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
    }

    res.status(200).json({ msg: 'Job deleted successfully' })
}