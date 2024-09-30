import { query } from "../services/db.js";

export const getAllTrains = async () =>
  await query("SELECT * FROM trains");

export const getTrain = async (id) => {
  try {
    const res = await query("SELECT * FROM trains WHERE id = ?", [id]);
    if (res.length < 1) {
      return {
        is_error: true,
        message: "Train with the given ID is not found",
      };
    }
    return res[0];
  } catch (error) {
    console.error(error);
  }
};

export const addNewTrain = async (trainDetails) => {
  const { name, route, schedule } = trainDetails;
  await query(
    `INSERT INTO trains (name, route, schedule) VALUES (?, ?, ?)`,
    [name, route, schedule]
  );
};

export const updateTrain = async (id, updatedTrainDetails) => {
  const [oldTrainDetails] = await query(
    `SELECT * FROM trains WHERE id = ?`,
    [id]
  );

  if (oldTrainDetails === undefined) {
    throw new Error("Train with that ID does not exist");
  }

  if (oldTrainDetails) {
    try {
      const trainDetails = {
        ...oldTrainDetails,
        ...updatedTrainDetails,
      };
      const { name, route, schedule } = trainDetails;
      await query(
        `UPDATE trains SET name = ?, route = ?, schedule = ? WHERE id = ?`,
        [name, route, schedule, id]
      );
    } catch (error) {
      throw new Error("Error updating train details: " + error.message);
    }
  }
};

export const deleteTrain = async (id) =>
  await query("DELETE FROM trains WHERE id = ?", [id]);

export const getAllBookings = async () =>
  await query("SELECT * FROM bookings");

export const addNewBooking = async (bookingDetails) => {
  const { train_id, user_id } = bookingDetails;
  await query(
    `INSERT INTO bookings (train_id, user_id) VALUES (?, ?)`,
    [train_id, user_id]
  );
};

export const getAllUsers = async () =>
  await query("SELECT * FROM users");

export const addUser = async (userDetails) => {
  const { username, password, email } = userDetails;
  await query(
    `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
    [username, password, email]
  );
};

export const getAllStations = async () =>
  await query("SELECT * FROM stations");

export const addStation = async (stationDetails) => {
  const { name, location } = stationDetails;
  await query(
    `INSERT INTO stations (name, location) VALUES (?, ?)`,
    [name, location]
  );
};

export const getTrainSchedule = async () =>
  await query("SELECT * FROM train_schedule");

export const addTrainSchedule = async (scheduleDetails) => {
  const { train_id, station_id, arrival_time, departure_time } = scheduleDetails;
  await query(
    `INSERT INTO train_schedule (train_id, station_id, arrival_time, departure_time) VALUES (?, ?, ?, ?)`,
    [train_id, station_id, arrival_time, departure_time]
  );
};
