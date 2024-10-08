const { createProxyMiddleware } = require('http-proxy-middleware');
const { ROOT_URL } = require('./services/api');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${ROOT_URL}`, // Replace with the server URL
      changeOrigin: true,
    })
  );
};