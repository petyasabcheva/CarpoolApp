// EditTripPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTripById, updateTrip } from './api';
import { useNavigate } from 'react-router-dom';

const EditTripPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    seatsAvailable: 0,
    date: '',
    luggageSpace: false,
    smokingAllowed: false,
    airConditioning: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await fetchTripById(tripId);
        setTrip(tripData);
        setFormData({
          start: tripData.start,
          end: tripData.end,
          seatsAvailable: tripData.seatsAvailable,
          date: tripData.date,
          luggageSpace: tripData.luggageSpace,
          smokingAllowed: tripData.smokingAllowed,
          airConditioning: tripData.airConditioning
        });
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    fetchData();
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrip(tripId, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="start" className="form-label">Start:</label>
          <input type="text" className="form-control" id="start" name="start" value={formData.start} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="end" className="form-label">End:</label>
          <input type="text" className="form-control" id="end" name="end" value={formData.end} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="seatsAvailable" className="form-label">Брой места</label>
          <input type="number" className="form-control" id="seatsAvailable" name="seatsAvailable" value={formData.seatsAvailable} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="luggageSpace" name="luggageSpace" checked={formData.luggageSpace} onChange={handleChange} />
          <label className="form-check-label" htmlFor="luggageSpace">Luggage Space</label>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="smokingAllowed" name="smokingAllowed" checked={formData.smokingAllowed} onChange={handleChange} />
          <label className="form-check-label" htmlFor="smokingAllowed">Smoking Allowed</label>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="airConditioning" name="airConditioning" checked={formData.airConditioning} onChange={handleChange} />
          <label className="form-check-label" htmlFor="airConditioning">Air Conditioning</label>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTripPage;
