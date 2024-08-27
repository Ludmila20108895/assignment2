import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const reportController = {
  async index(request, response){
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Editing Track ${trackId} from Playlist ${playlistId}`);
    const viewData = {
      title: "Edit Song",
      playlist: await playlistStore.getPlaylistById(playlistId),
      track: await trackStore.getTrackById(trackId),
    };
    response.render("track-view", viewData);
  },
  }
  async addReport(request, response) {
    const stationId = request.params.id;
    const newReport = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
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
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + stationId);
},
};
