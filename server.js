export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const reports = await reportStore.getReportsByStationId(station._id);
        const viewData = {
            title: "Station",
            station: station,
            reports: reports, // Ensure reports are included in the view data
        };
        response.render("station-view", viewData); // Render station-view with reports
    },
    // Other methods...
};
