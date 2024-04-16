import React from 'react';
import TripForm from './TripForm';
import { addTrip } from './api'; 
import { useNavigate } from 'react-router-dom';

const AddTripPage = () => {
    const navigate = useNavigate();

    const handleSave = async (tripData) => {
        try {
            const response = await addTrip(tripData);
            console.log('Trip added successfully:', response);
            navigate('/'); 
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Добавяне на пътуване</h1>
            <TripForm onSave={handleSave} />
        </div>
    );
}

export default AddTripPage
