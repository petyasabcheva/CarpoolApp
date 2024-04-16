import React, { useEffect, useState } from 'react';
import { fetchTrips } from './api';
import TripsTable from './TripsTable';
import SearchForm from './SearchForm';

const TripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const allTrips = await fetchTrips();
            setTrips(allTrips);
            setFilteredTrips(allTrips);
        };

        loadData();
    }, []);

    const handleSearch = (searchParams) => {
        const results = trips.filter(trip => {
            const matchStartLocation = !searchParams.startLocation || (trip.start && trip.start.includes(searchParams.startLocation));
            const matchEndLocation = !searchParams.endLocation || (trip.end && trip.end.includes(searchParams.endLocation));
            const matchDate = !searchParams.travelDate || (trip.date && new Date(trip.date).toLocaleDateString() === new Date(searchParams.travelDate).toLocaleDateString());
            const matchLuggage = searchParams.luggageSpace === undefined || (trip.luggageSpace !== undefined && trip.luggageSpace === searchParams.luggageSpace);
            const matchSmoking = searchParams.smokingAllowed === undefined || (trip.smokingAllowed !== undefined && trip.smokingAllowed === searchParams.smokingAllowed);
            const matchAirConditioning = searchParams.airConditioning === undefined || (trip.airConditioning !== undefined && trip.airConditioning === searchParams.airConditioning);

            return matchStartLocation && matchEndLocation && matchDate && matchLuggage && matchSmoking && matchAirConditioning;
        });

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
