import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import AllJobs from './pages/AllJobs.jsx'
import AddJob from './pages/AddJob.jsx'
import Profile from './pages/Profile.jsx'
import Error from './pages/Error.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="all-jobs" />} />
                <Route path="all-jobs" element={<AllJobs />} />
                <Route path="add-job" element={<AddJob />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default App