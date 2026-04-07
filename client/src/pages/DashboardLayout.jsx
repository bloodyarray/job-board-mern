import { Link, Outlet, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('editJob')
        navigate('/register')
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-shell">
                <div className="dashboard-top">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Hello, {user?.name}</p>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>

                <nav className="navbar-links">
                    <Link className="nav-link" to="/dashboard/all-jobs">
                        All Jobs
                    </Link>
                    <Link className="nav-link" to="/dashboard/add-job">
                        Add Job
                    </Link>
                    <Link className="nav-link" to="/dashboard/profile">
                        Profile
                    </Link>
                </nav>

                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout