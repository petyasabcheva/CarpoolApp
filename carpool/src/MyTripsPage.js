import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import TripsTable from './TripsTable';
import { fetchMyTrips } from '../api';

const MyTripsPage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchMyTrips(auth.currentUser.uid).then(setTrips);
    }
  }, []);

  return (
    <div>
      <h1>Моите пътувания</h1>
      <TripsTable trips={trips} />
    </div>
  );
};

export default MyTripsPage;