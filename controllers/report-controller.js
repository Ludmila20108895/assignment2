import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const reportController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Editing Report ${reportId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Report",
      station: await stationStore.getStationById(stationId),
      report: await reportStore.getReportById(reportId),
    };
    response.render("report-view", viewData);
  },

  async addReport(request, response) {
    const stationId = request.params.id;
    const newReport = {
      code: request.body.code,
      minTemperature: request.body.minTemperature,
      maxTemperature: request.body.maxTemperature,
      minWindSpeed: request.body.minWindSpeed,
      maxWindSpeed: request.body.maxWindSpeed,
      windDirection: request.body.windDirection,
      minPressure: request.body.minPressure,
      maxPressure: request.body.maxPressure,
    };
     console.log(`Adding report to station ${stationId}`, newReport);
    await reportStore.addReport(stationId, newReport);
    response.redirect(`/station/${stationId}`);
  },

  async viewReports(request, response) {
    const stationId = request.params.id;
    const reports = await reportStore.getReportsByStationId(stationId);
    response.render("station-view", { stationId, reports });
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    console.log(`Updating Report ${reportId} from Station ${stationId}`);
    const report = await reportStore.getReportById(reportId);
    await reportStore.updateReport(report, updatedReport);
    response.redirect("/station/" + stationId);
  },
};
