import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from './UserContext'; 

function SignUp() {
    const { setUser } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegistration = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                setUser(user);
                navigate('/');
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <form onSubmit={handleRegistration} className="container mt-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Име</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Имейл адрес</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Парола</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Регистрация</button>
        </form>
    );
}

export default SignUp;
