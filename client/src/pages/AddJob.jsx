import { useEffect, useState } from 'react'
import customFetch from '../utils/axiosInstance'

const AddJob = () => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        jobLocation: '',
        status: 'pending',
        jobType: 'full-time',
    })

    const [msg, setMsg] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        const savedJob = localStorage.getItem('editJob')

        if (savedJob) {
            const job = JSON.parse(savedJob)
            setFormData({
                company: job.company || '',
                position: job.position || '',
                jobLocation: job.jobLocation || '',
                status: job.status || 'pending',
                jobType: job.jobType || 'full-time',
            })
            setIsEditing(true)
            setEditId(job._id)
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const clearForm = () => {
        setFormData({
            company: '',
            position: '',
            jobLocation: '',
            status: 'pending',
            jobType: 'full-time',
        })
        setIsEditing(false)
        setEditId(null)
        localStorage.removeItem('editJob')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg('')

        try {
            if (isEditing && editId) {
                await customFetch.patch(`/jobs/${editId}`, formData)
                setMsg('Job updated successfully')
            } else {
                await customFetch.post('/jobs', formData)
                setMsg('Job created successfully')
            }

            clearForm()
        } catch (error) {
            setMsg(error.response?.data?.msg || 'Error saving job')
        }
    }

    return (
        <div>
            <h2 className="section-title">{isEditing ? 'Edit Job' : 'Add Job'}</h2>

            <div className="form-card">
                <form onSubmit={handleSubmit} className="form-grid">
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={formData.position}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="jobLocation"
                        placeholder="Job Location"
                        value={formData.jobLocation}
                        onChange={handleChange}
                    />

                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="pending">pending</option>
                        <option value="interview">interview</option>
                        <option value="declined">declined</option>
                    </select>

                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                    >
                        <option value="full-time">full-time</option>
                        <option value="part-time">part-time</option>
                        <option value="remote">remote</option>
                    </select>

                    <button type="submit">
                        {isEditing ? 'Update Job' : 'Add Job'}
                    </button>

                    {isEditing && (
                        <button type="button" onClick={clearForm}>
                            Cancel Edit
                        </button>
                    )}
                </form>

                {msg && <p className="success-msg">{msg}</p>}
            </div>
        </div>
    )
}

export default AddJob