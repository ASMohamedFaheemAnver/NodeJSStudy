const errorTracer = require("../debug/error-tracer");

exports.pageNotFound = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  res.status(404).render("page-not-found", {
    pageTitle: "PAGE NOT FOUND",
    path: "/page-not-found"
  });
};
