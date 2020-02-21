const errorTracer = require("../debug/error-tracer");

exports.pageNotFound = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  res.status(404).render("404", {
    pageTitle: "PAGE NOT FOUND",
    path: "/page-not-found"
  });
};

exports.internalServerError = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "INTERNAL SERVER ERROR!",
    path: "/page-not-found"
  });
};
