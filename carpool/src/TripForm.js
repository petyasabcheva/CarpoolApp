import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext'; 

const TripForm = ({ trip, onSave }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    date: '',
    seatsAvailable: 0,
    smokingAllowed: false,
    luggageSpace: false,
    airConditioning: false,
    creator: user ? user.uid : '' 
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        ...trip,
        creator: trip.creator || (user ? user.uid : '') 
      });
    }
  }, [trip, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="start" className="form-label">Начална дестинация</label>
        <input type="text" className="form-control" id="start" name="start" value={formData.start} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="end" className="form-label">Крайна дестинация</label>
        <input type="text" className="form-control" id="end" name="end" value={formData.end} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="seatsAvailable" className="form-label">Брой места</label>
        <input type="number" className="form-control" id="seatsAvailable" name="seatsAvailable" value={formData.seatsAvailable} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Дата на тръгване</label>
        <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="smokingAllowed" name="smokingAllowed" checked={formData.smokingAllowed} onChange={handleChange} />
        <label className="form-check-label" htmlFor="smokingAllowed">Пушенето разрешено</label>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="luggageSpace" name="luggageSpace" checked={formData.luggageSpace} onChange={handleChange} />
        <label className="form-check-label" htmlFor="luggageSpace">Възможност за багаж</label>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="airConditioning" name="airConditioning" checked={formData.airConditioning} onChange={handleChange} />
        <label className="form-check-label" htmlFor="airConditioning">Климатик</label>
      </div>
      <button type="submit" className="btn btn-primary">Запази</button>
    </form>
  );
};

export default TripForm;
