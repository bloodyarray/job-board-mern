import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="page-center">
            <div className="landing-card">
                <h1>Job Board</h1>
                <p>Mini MERN application for managing jobs</p>
                <button onClick={() => navigate('/register')}>Login / Register</button>
            </div>
        </div>
    )
}

export default Landing