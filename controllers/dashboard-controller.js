import axios from "axios";
import express from "express";
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationController } from "./station-controller.js";
import { reportController } from "./report-controller.js";
 const weatherRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=48.864716&lon=2.349014&appid=4977adfd49f60f08e25e4a043454a50f"


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

  // Render the add-station view
  renderAddStationForm(request, response) {
    response.render("add-station", { title: "Add New Station" }); 
  },

  //  Information  to add a new station
  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard"); // Redirect to the list of stations
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
    response.render("list-station", viewData); 
  },

  // Handles deleting station
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard"); // Redirect to the list of stations after was deleted 
  },


  async addreport(request, response) {
    console.log("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const latLongRequestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=YOUR_API_KEY_HERE`;
    const result = await axios.get(latLongRequestUrl);
    console.log(latLongRequestUrl)
    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.temperature = currentWeather.main.temp;
      report.windSpeed = currentWeather.wind.speed;
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("dashboard-view", viewData);
  },
};
