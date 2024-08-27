import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationId = stationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByStationId(stationId) {
    await db.read();
    return db.data.reports.filter((report) => report.stationId === stationId);
  },

  async getReportById(reportId) {
    await db.read();
    return db.data.reports.find((report) => report._id === reportId);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    if (index !== -1) {
      db.data.reports.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },
  
   async deleteReport(id) {
 await db.read();
 const index = db.data.reports.findIndex((report) => report._id === id);
 db.data.report.splice(index, 1);
 await db.write();
 },

  async updateReport(reportId, updatedReport) {
    await db.read();
    const report = db.data.reports.find((report) => report._id === reportId);
    if (report) {
      report.code = updatedReport.code;
      report.temperature = updatedReport.temperature;
      report.windSpeed = updatedReport.windSpeed;
      report.windDirection = updatedReport.windDirection;
      report.pressure = updatedReport.pressure;
      await db.write();
    }
  },
};
