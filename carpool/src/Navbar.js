import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { getAuth, signOut } from 'firebase/auth';
import {FaCarSide } from 'react-icons/fa';



const Navbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null); 
            navigate('/login');
        }).catch((error) => {
            console.error('Logout failed:', error);
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Carpool <FaCarSide/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Пътувания</Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-trip">Добави</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/my-trips">My Trips</Link>
                                </li> */}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Вход</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Регистрация</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={handleLogout}>Изход</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
