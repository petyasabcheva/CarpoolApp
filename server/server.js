const express = require('express');
const mongoose = require('mongoose');
const Trip = require('./models/Trip');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/carpoolApp')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Carpool API!');
});

app.post('/trips', async (req, res) => {
    const { start, end, date, seatsAvailable, smokingAllowed, luggageSpace, airConditioning, creator } = req.body;
    try {
        const newTrip = new Trip({ start, end, date, seatsAvailable, smokingAllowed, luggageSpace, airConditioning, creator });
        await newTrip.save();
        res.status(201).send('Trip added');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/trips/:tripId', async (req, res) => {
    const { tripId } = req.params;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/trips/:tripId', async (req, res) => {
    const { tripId } = req.params;
    const newData = req.body; // Assuming the new data is sent in the request body
  
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(tripId, newData, { new: true });
      if (!updatedTrip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
      res.status(200).json(updatedTrip);
    } catch (error) {
      console.error('Error editing trip:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
app.post('/trips/join/:id', async (req, res) => {
    const { userId } = req.body;
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip.participants.includes(userId)) {
            trip.participants.push(userId);
            await trip.save();
            res.status(200).send('Joined trip');
        } else {
            res.status(400).send('Already joined');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/trips/leave/:id', async (req, res) => {
    const { userId } = req.body;
    try {
        const trip = await Trip.findById(req.params.id);
        trip.participants = trip.participants.filter(id => id !== userId);
        await trip.save();
        res.status(200).send('Left trip');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/trips/:tripId', async (req, res) => {
    const { tripId } = req.params;

    try {
        await Trip.findByIdAndDelete(tripId);
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
