import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Импортиране на UserProvider
import Navbar from './Navbar';
import AddTripPage from './AddTripPage';
import EditTripPage from './EditTripPage';
import TripsPage from './TripsPage';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <UserProvider> 
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<TripsPage />} />
            <Route path="/add-trip" element={<AddTripPage />} />
            <Route path="/edit-trip/:tripId" element={<EditTripPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
