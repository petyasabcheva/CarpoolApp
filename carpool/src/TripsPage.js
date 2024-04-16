import React, { useEffect, useState } from 'react';
import TripsTable from './TripsTable';
import SearchForm from './SearchForm';
import { fetchTrips } from './api';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allTrips = await fetchTrips();
    setTrips(allTrips);
    setFilteredTrips(allTrips);
  };

  const handleSearch = (searchParams) => {
    let results = trips;

    if (searchParams.startLocation) {
      results = results.filter(trip => trip.start.includes(searchParams.startLocation));
    }
    if (searchParams.endLocation) {
      results = results.filter(trip => trip.end.includes(searchParams.endLocation));
    }
    if (searchParams.travelDate) {
      results = results.filter(trip => new Date(trip.date).toLocaleDateString() === new Date(searchParams.travelDate).toLocaleDateString());
    }

    // Filter by amenities
    if (searchParams.luggageSpace) {
      results = results.filter(trip => trip.luggageSpace === searchParams.luggageSpace);
    }
    if (searchParams.airConditioning) {
      results = results.filter(trip => trip.airConditioning === searchParams.airConditioning);
    }
    if (searchParams.smokingAllowed) {
      results = results.filter(trip => trip.smokingAllowed === searchParams.smokingAllowed);
    }

    setFilteredTrips(results);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <div className="container mt-3">
                <TripsTable filteredTrips={filteredTrips} setFilteredTrips={setFilteredTrips} />
            </div>
    </div>
  );
};

export default TripsPage;
