export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About Weather Station",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};