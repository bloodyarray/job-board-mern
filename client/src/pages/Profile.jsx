const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <h2 className="section-title">Profile</h2>

            <div className="profile-card">
                <p style={{ marginBottom: '12px' }}>
                    <strong>Name:</strong> {user?.name}
                </p>
                <p>
                    <strong>Email:</strong> {user?.email}
                </p>
            </div>
        </div>
    )
}

export default Profile