import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js"; // Imports the report store

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    if (station) {
      // Gets all reports that relates the station
      station.reports = await reportStore.getReportsByStationId(station._id);
    }
    return station;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    if (index !== -1) {
      db.data.stations.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  async updateStation(id, updatedData) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    if (station) {
      Object.assign(station, updatedData);
      await db.write();
    }
  },
};
