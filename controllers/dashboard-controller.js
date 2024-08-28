import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  // Render the main dashboard view with a list of stations
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Station Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  // Render the add-station form view
  renderAddStationForm(request, response) {
    response.render("add-station", { title: "Add New Station" }); // Render the add-station.hbs form
  },

  // Handle the form submission to add a new station
  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
      weatherCode: 'N/A',    // Placeholder values for new stations
      minTemp: 'N/A',
      maxTemp: 'N/A',
      windDirection: 'N/A',
      minWindSpeed: 'N/A',
      maxWindSpeed: 'N/A',
      minPressure: 'N/A',
      maxPressure: 'N/A',
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard/liststations"); // Redirect to the list of stations
  },

  // Render the list of stations view
  async listStations(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    const viewData = {
      title: "List of Stations",
      stations: stations,
    };
    console.log("Listing all stations");
    response.render("list-station", viewData); // Render the list-station.hbs with station data
  },

  // Handle deletion of a station
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard/liststations"); // Redirect to the list of stations after deletion
  },
};
