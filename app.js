const PORT = process.env.PORT || 3000;
const app = require('./server.js');

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

