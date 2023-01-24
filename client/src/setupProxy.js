const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(["/store"], {
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
};