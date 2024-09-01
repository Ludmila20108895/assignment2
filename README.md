# Weather Station Application

## Overview
The Weather Station Application is a web-based platform that allows users to monitor weather conditions at many stations. Users can view real-time weather data, add new weather stations, and log weather reports for specific stations. The application is built using Node.js, Express, and Handlebars, with LowDB for data storage.

## Features
- **User Authentication**: Users can sign up, log in, and log out.
- **Weather Station Management**: Users can add, update, and delete weather stations.
- **Weather Reports**: Users can add weather reports that include data such as temperature, wind speed, wind direction, and pressure.
- **Dashboard**: A user-friendly dashboard to manage stations and view the latest weather reports.

## Project Structure
- **Controllers**: Manage the logic for requests and sending responses.
  - `about-controller.js`
  - `accounts-controller.js`
  - `dashboard-controller.js`
  - `station-controller.js`
  - `report-controller.js`
- **Models**: Handle data storage and retrieval.
  - `object-store.js`
  - `report-store.js`
  - `station-store.js`
  - `user-store.js`
- **Views**: Handlebars templates for rendering HTML pages.
  - Layouts and partials for consistent UI components.
- **Utilities**: Helps functions for initializing database connections.

-**Dependencies** :
--Node.js
--Express
--Handlebars
--LowDB
--UUID
--Axios
--Body-Parser
--Cookie-Parser
--Express-Fileupload