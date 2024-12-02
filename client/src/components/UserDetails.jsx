import React, { useState, useEffect } from 'react';
import './UserDetails.css';

export const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/auth/userDetails');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/auth/deleteUser/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter(user => user._id !== id));
                alert('User deleted successfully');
            } else {
                const errorData = await response.json();
                alert(errorData.msg || 'Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user');
        }
    };

    const handleAddUserClick = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                const createdUser = {
                    id: users.length + 1,
                    username: newUser.username,
                    email: newUser.email,
                    role: 'User',  // Assuming by default all users are non-admin
                };
                setUsers([...users, createdUser]);
                setNewUser({
                    username: '',
                    email: '',
                    password: '',
                });
                setShowForm(false);
                alert(data.msg);
            } else {
                alert(data.msg);
            }

        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration');
        }
    };

    return (
        <div className="user-details">
            <button className="add-user-btn" onClick={handleAddUserClick}>Add User</button>
            {showForm && (
                <form className="add-user-form" onSubmit={handleSubmit}>
                    <h2>Add New User</h2>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}

            <div className="user-cards">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <div className="user-actions">
                            <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
