import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className="page-center">
            <div className="landing-card">
                <h1>404</h1>
                <p>Page not found</p>
                <Link to="/">Back home</Link>
            </div>
        </div>
    )
}

export default Error