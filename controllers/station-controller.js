import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js"; // Import reportStore
export const stationController = {
   async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const reports = await reportStore.getReportsByStationId(station._id); // Fetch all reports for this station
     const viewData = {
      title: "Station",
      station: station,
        reports: reports, // Pass reports to the view
       
    };
    response.render("station-view", viewData);
  },
  
  async viewStation(request, response) {
    const stationId = request.params.id;
    const station = await stationStore.getStationById(request.params.id);
    const reports = await reportStore.getReportsByStationId(stationId); // Fetch reports for the station
    const viewData = {
      title: station.title,
      station: station,
      report: reports //pass reports to station-view
    };
    console.log(`Rendering station ${station.title}`);
    response.render("station-view", viewData);
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    await stationStore.deleteStationById(stationId);
    console.log(`Deleted station ${stationId}`);
    response.redirect("/station");
  },

  async updateStation(request, response) {
    const stationId = request.params.id;
    const updatedData = {
      title: request.body.title,
      
    };
    await stationStore.updateStation(stationId, updatedData);
    console.log(`Updated station ${stationId}`);
    response.redirect(`/station/${stationId}`);
  },
  
  
  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
},

  
};