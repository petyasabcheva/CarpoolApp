import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTrips = async () => {
    try {
        const response = await axios.get(`${API_URL}/trips`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

export const fetchTripById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trip:', error);
        throw error;
    }
};

export const updateTrip = async (id, newData) => {
    try {
        const response = await axios.put(`${API_URL}/trips/${id}`, newData);
        return response.data;
    } catch (error) {
        console.error('Error editing trip:', error);
        throw error;
    }
};


export const addTrip = async (tripData) => {
    try {
        const response = await axios.post(`${API_URL}/trips`, tripData);
        return response.data;
    } catch (error) {
        console.error('Error adding trip:', error);
        throw error;
    }
};

export const deleteTrip = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/trips/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
};

export const joinTrip = async (tripId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/trips/join/${tripId}`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error joining trip:', error);
        throw error;
    }
};

export const leaveTrip = async (tripId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/trips/leave/${tripId}`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error leaving trip:', error);
        throw error;
    }
};

export const fetchTrip = async (tripId) => {
    try {
        const response = await axios.get(`${API_URL}/trips/${tripId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trip details:', error);
        throw error;
    }
};
