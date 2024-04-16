import React from 'react';

const Trip = ({ trip }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{trip.start} до {trip.end}</h5>
                    <p className="card-text">
                        Дата на пътуване: {new Date(trip.date).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                        Свободни места: {trip.seatsAvailable}
                    </p>
                    <button className="btn btn-primary">Подробности</button>
                </div>
            </div>
        </div>
    );
};

export default Trip;
