import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customFetch from '../utils/axiosInstance'

const Register = () => {
    const [isMember, setIsMember] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [msg, setMsg] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg('')

        try {
            const url = isMember ? '/auth/login' : '/auth/register'

            const payload = isMember
                ? {
                    email: formData.email,
                    password: formData.password,
                }
                : {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }

            const { data } = await customFetch.post(url, payload)

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            navigate('/dashboard')
        } catch (error) {
            setMsg(
                error.response?.data?.msg ||
                error.response?.data?.error ||
                'Something went wrong'
            )
        }
    }

    return (
        <div className="page-center">
            <div className="auth-card">
                <h2>{isMember ? 'Login' : 'Register'}</h2>

                <form onSubmit={handleSubmit}>
                    {!isMember && (
                        <div className="form-row">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="form-row">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">{isMember ? 'Login' : 'Register'}</button>
                    </div>
                </form>

                {msg && <p className="form-msg">{msg}</p>}

                <p className="form-toggle">
                    {isMember ? 'No account yet?' : 'Already have an account?'}
                    <button type="button" onClick={() => setIsMember(!isMember)}>
                        {isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Register