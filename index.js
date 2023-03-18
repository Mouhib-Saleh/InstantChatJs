const server = require('./app');

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

