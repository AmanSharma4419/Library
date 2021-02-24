const { createProxyMiddleware } = require("http-proxy-middleware");
var baseurl = "https://formeeadmin.bicsglobal.com";
module.exports = function (app) {
  // Creating proxy for download all file function
  app.use(
    "/student_uploads/",
    createProxyMiddleware({
      target: baseurl,
      changeOrigin: true,
    })
  );
};
