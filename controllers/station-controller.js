import { stationStore } from "../models/station-store.js";

export const stationController = {
   async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },
  
  async viewStation(request, response) {
    const stationId = request.params.id;
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: station.title,
      station: station,
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
    await stationtore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
},

  
};