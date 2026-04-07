import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customFetch from '../utils/axiosInstance'

const AllJobs = () => {
    const [jobs, setJobs] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [jobType, setJobType] = useState('all')
    const [sort, setSort] = useState('latest')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const fetchJobs = async () => {
        setLoading(true)
        try {
            const { data } = await customFetch.get(
                `/jobs?search=${search}&status=${status}&jobType=${jobType}&sort=${sort}`
            )
            setJobs(data.jobs)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [search, status, jobType, sort])

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this job?'
        )

        if (!confirmDelete) return

        try {
            await customFetch.delete(`/jobs/${id}`)
            fetchJobs()
        } catch (error) {
            console.log(error)
        }
    }

    const editJob = (job) => {
        localStorage.setItem('editJob', JSON.stringify(job))
        navigate('/dashboard/add-job')
    }

    const getStatusClass = (statusValue) => {
        if (statusValue === 'interview') return 'status-badge status-interview'
        if (statusValue === 'declined') return 'status-badge status-declined'
        return 'status-badge status-pending'
    }

    return (
        <div>
            <h2 className="section-title">All Jobs</h2>

            <div className="form-card">
                <div className="filters-grid">
                    <input
                        type="text"
                        placeholder="Search by position"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="all">all</option>
                        <option value="pending">pending</option>
                        <option value="interview">interview</option>
                        <option value="declined">declined</option>
                    </select>

                    <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="all">all</option>
                        <option value="full-time">full-time</option>
                        <option value="part-time">part-time</option>
                        <option value="remote">remote</option>
                    </select>

                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">latest</option>
                        <option value="oldest">oldest</option>
                        <option value="a-z">a-z</option>
                        <option value="z-a">z-a</option>
                    </select>
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                {loading ? (
                    <p className="empty-state">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <p className="empty-state">No jobs found</p>
                ) : (
                    <div className="jobs-grid">
                        {jobs.map((job) => (
                            <div key={job._id} className="job-card">
                                <h3>{job.position}</h3>

                                <div className="job-meta">
                                    <p>Company: {job.company}</p>
                                    <p>Location: {job.jobLocation}</p>
                                    <p>Type: {job.jobType}</p>
                                    <div>
                    <span className={getStatusClass(job.status)}>
                      {job.status}
                    </span>
                                    </div>
                                </div>

                                <div className="job-actions">
                                    <button className="edit-btn" onClick={() => editJob(job)}>
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteJob(job._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllJobs