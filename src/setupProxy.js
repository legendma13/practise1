const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/server',
    createProxyMiddleware({
      target: 'http://localhost', // Change this to match your PHP server's address
      changeOrigin: true,
    })
  );
};
