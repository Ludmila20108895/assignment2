import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { reportController } from "./controllers/report-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);

router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

// Routes for Dashboard
router.get("/dashboard", dashboardController.index); // The route for dashboard
router.get("/dashboard/addstation", dashboardController.renderAddStationForm); // Render to add  new station
router.post("/dashboard/addstation", dashboardController.addStation); // Form for adding a station
router.get("/dashboard/liststations", dashboardController.listStations); // Render list of stations
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation); //Form for deleting sdtation

// Routes for Stations
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", reportController.addReport);
router.get("/station/:stationid/deletereport/:reportid", reportController.deleteReport);
router.get("/station/:stationid/editreport/:reportid", reportController.index);
router.post("/station/:stationid/updatereport/:reportid", reportController.update);
router.post("/dashboard/addreport", dashboardController.addreport);

// About and Logout
router.get("/about", aboutController.index);
router.get("/logout", accountsController.logout);

