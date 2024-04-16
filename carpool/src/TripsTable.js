import React from 'react';
import { FaSuitcase, FaSmokingBan, FaSnowflake } from 'react-icons/fa';
import { deleteTrip, joinTrip, leaveTrip, fetchTrips } from './api';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const TripsTable = ({ filteredTrips, setFilteredTrips }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleJoin = async (tripId) => {
    try {
      await joinTrip(tripId, user?.uid);
      refreshTrips();
    } catch (error) {
      console.error('Failed to join trip:', error);
    }
  };

  const handleLeave = async (tripId) => {
    try {
      await leaveTrip(tripId, user?.uid);
      refreshTrips();
    } catch (error) {
      console.error('Failed to leave trip:', error);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      refreshTrips();
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const handleEdit = (tripId) => {
    navigate(`/edit-trip/${tripId}`);
  };

  const refreshTrips = async () => {
    const trips = await fetchTrips();
    setFilteredTrips(trips);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Начална дестинация</th>
            <th>Крайна дестинация</th>
            <th>Дата на тръгване</th>
            <th>Брой свободни места</th>
            <th>Удобства</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.start}</td>
              <td>{trip.end}</td>
              <td>{new Date(trip.date).toLocaleDateString()}</td>
              <td>{trip.seatsAvailable - trip.participants.length}</td>
              <td>
                {trip.luggageSpace && <FaSuitcase title="С възможност за багаж" />}
                {!trip.smokingAllowed && <FaSmokingBan title="Пушенето забранено" />}
                {trip.airConditioning && <FaSnowflake title="Климатик" />}
              </td>
              <td>
                {user?.uid && (
                  <>
                    {trip.creator === user.uid ? (
                      <>
                        <button className="btn btn-info" onClick={() => handleEdit(trip._id)}>Редактирай</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(trip._id)}>Изтрий</button>
                      </>
                    ) : trip.participants.includes(user.uid) ? (
                      <button className="btn btn-warning" onClick={() => handleLeave(trip._id)}>Напусни</button>
                    ) : (trip.seatsAvailable - trip.participants.length > 0 &&
                      <button className="btn btn-success" onClick={() => handleJoin(trip._id)}>Присъедини се</button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
