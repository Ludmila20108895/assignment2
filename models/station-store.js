import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js"; 

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
      station.reports = await reportStore.getReportsByStationId(station._id);
    }
    return station;
  },

  async getStationsByUserId(userid) {
    await db.read();
    const stations = db.data.stations.filter((station) => station.userid === userid);
    
    // Loop through each station to add the latest report data
    for (const station of stations) {
      const reports = await reportStore.getReportsByStationId(station._id);
      if (reports.length > 0) {
        const latestReport = reports[reports.length - 1]; // Get the latest report
        station.latestReport = latestReport;
      } else {
        station.latestReport = null; // If no reports response  with null
      }
    }
    
    return stations;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  async updateStation(id, updatedData) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    if (station) {
      // Update the station with new data
      Object.assign(station, updatedData);
    }
    await db.write();
  },
};
