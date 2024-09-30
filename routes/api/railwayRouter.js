import express from "express";
import {
  getAllTrains,
  getTrain,
  addNewTrain,
  updateTrain,
  deleteTrain,
  getAllBookings,
  addNewBooking,
  getAllUsers,
  addUser,
  getAllStations,
  addStation,
  getTrainSchedule,
  addTrainSchedule
} from "../../controllers/railwayController.js"; 
import { v4 as uuid } from "uuid";

export const railwayRouter = express.Router();

railwayRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const trains = await getAllTrains();
      res.json(trains);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving trains", error: error.message });
    }
  })
  .post(async (req, res) => {
    const trainDetails = {
      id: uuid(), 
      name: req.body.name,
      route: req.body.route,
      schedule: req.body.schedule,
    };
    try {
      await addNewTrain(trainDetails);
      const addedTrain = await getTrain(trainDetails.id);
      res.status(201).json({ message: "Train added successfully!", ...addedTrain });
    } catch (error) {
      res.status(500).json({ message: "Error adding train", error: error.message });
    }
  });

railwayRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const train = await getTrain(req.params.id);
      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }
      res.json(train);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving train", error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedDetails = {
        ...(req.body.name ? { name: req.body.name } : {}),
        ...(req.body.route ? { route: req.body.route } : {}),
        ...(req.body.schedule ? { schedule: req.body.schedule } : {}),
      };
      await updateTrain(req.params.id, updatedDetails);
      const updatedTrain = await getTrain(req.params.id);
      res.json(updatedTrain);
    } catch (error) {
      res.status(500).json({ message: "Error updating train", error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteTrain(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting train", error: error.message });
    }
  });


railwayRouter
  .route("/bookings")
  .get(async (req, res) => {
    try {
      const bookings = await getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving bookings", error: error.message });
    }
  })
  .post(async (req, res) => {
    const bookingDetails = {
      train_id: req.body.train_id,
      user_id: req.body.user_id,
    };
    try {
      await addNewBooking(bookingDetails);
      res.status(201).json({ message: "Booking successful!" });
    } catch (error) {
      res.status(500).json({ message: "Error making booking", error: error.message });
    }
  });

railwayRouter
  .route("/users")
  .get(async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
  })
  .post(async (req, res) => {
    const userDetails = {
      username: req.body.username,
      password: req.body.password, 
      email: req.body.email,
    };
    try {
      await addUser(userDetails);
      res.status(201).json({ message: "User added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error adding user", error: error.message });
    }
  });

railwayRouter
  .route("/stations")
  .get(async (req, res) => {
    try {
      const stations = await getAllStations();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving stations", error: error.message });
    }
  })
  .post(async (req, res) => {
    const stationDetails = {
      name: req.body.name,
      location: req.body.location,
    };
    try {
      await addStation(stationDetails);
      res.status(201).json({ message: "Station added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error adding station", error: error.message });
    }
  });

railwayRouter
  .route("/train-schedule")
  .get(async (req, res) => {
    try {
      const schedules = await getTrainSchedule();
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving train schedules", error: error.message });
    }
  })
  .post(async (req, res) => {
    const scheduleDetails = {
      train_id: req.body.train_id,
      station_id: req.body.station_id,
      arrival_time: req.body.arrival_time,
      departure_time: req.body.departure_time,
    };
    try {
      await addTrainSchedule(scheduleDetails);
      res.status(201).json({ message: "Train schedule added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error adding train schedule", error: error.message });
    }
  });
