import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Log_In() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@cornell.edu')) {
            setError('Email must be a Cornell email ending in @cornell.edu');
            return;
        }

        try {
            // Send the login request to your backend API
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || 'Login failed');
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            // Store the JWT token and email in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('alias', data.alias);
            localStorage.setItem('cid', data.cid);
            // console.log(data.token);
            // console.log(data.email);

            // Clear any existing error
            setError('');

            // Navigate to home or dashboard after successful login
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: '#ff7f50',
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginBottom: '1rem', // Space between the two buttons
                            }}
                        >
                            Be Your Lifelong Cause
                        </button>
                        
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <button
                                type="submit"
                                style={{
                                width: '70%', // Smaller width for the second button
                                padding: '0.5rem',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: '#ffd7b5',
                                color: '#fff',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                display: 'block', // Block display to apply auto margins
                                margin: '0 auto', // Center the second button horizontally
                                }}
                            >
                                Or Discover It Today - Sign Up!
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
