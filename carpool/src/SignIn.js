import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from './UserContext';

function SignIn() {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = event => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                setUser(user);
                navigate('/'); 
            })
            .catch(err => {
                setError('Failed to login: ' + err.message);
                console.error('Login failed:', err);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
}

export default SignIn;
