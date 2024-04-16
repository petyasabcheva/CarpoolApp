import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    startLocation: '',
    endLocation: '',
    travelDate: '',
    luggageSpace: false,
    airConditioning: false,
    smokingAllowed: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSearchParams({ ...searchParams, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams); 
  };

  return (
    <div className="search-form my-3">
      <form onSubmit={handleSubmit} className="container">
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Начална дестинация"
              name="startLocation"
              value={searchParams.startLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Крайна дестинация"
              name="endLocation"
              value={searchParams.endLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              name="travelDate"
              value={searchParams.travelDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col form-check">
            <input
              type="checkbox"
              id="luggageSpace"
              name="luggageSpace"
              className="form-check-input"
              checked={searchParams.luggageSpace}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="luggageSpace">
              С възможност за багаж
            </label>
          </div>
          <div className="col form-check">
            <input
              type="checkbox"
              id="airConditioning"
              name="airConditioning"
              className="form-check-input"
              checked={searchParams.airConditioning}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="airConditioning">
              Климатик
            </label>
          </div>
          <div className="col form-check">
            <input
              type="checkbox"
              id="smokingAllowed"
              name="smokingAllowed"
              className="form-check-input"
              checked={searchParams.smokingAllowed}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="smokingAllowed">
              Пушенето разрешено
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary">Търсене</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
