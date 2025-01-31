import axios from "axios";
import express from "express";
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

const apiKey ="4977adfd49f60f08e25e4a043454a50f" ; // my API key

export const dashboardController = {
  // Render the main dashboard view and update list of stations and reports
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id); 
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  // Render the add-station view
  renderAddStationForm(request, response) {
    response.render("add-station", { title: "Add New Station" });
  },

  // Adding new station and redirect to dashboard
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

  // Renders list of stations view
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

  // Manages to delete station
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard"); // Redirect to the station lists after was deleted
  },

  // Add a report using external API data (OpenWeatherMap)
  async addreport(request, response) {
    console.log("rendering new report");
    const stationId = request.params.id; // Get station ID from request params
    
    // Fetch station details from the database
    const station = await stationStore.getStationById(stationId);
    const lat = station.latitude;
    const lng = station.longitude;

    let report = {};
    const latLongRequestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    const result = await axios.get(latLongRequestUrl);
    console.log(latLongRequestUrl);

    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.minTemperature = currentWeather.main.temp_min; // Added min temp
      report.maxTemperature = currentWeather.main.temp_max; // Added max temp
      report.windSpeed = currentWeather.wind.speed; // Actual wind speed
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }

    console.log(report);
    await stationStore.addReportToStation(stationId, report); // Hypothetical method to add report
    response.redirect(`/station/${stationId}`); // Redirect back to the station's view
  },
};
