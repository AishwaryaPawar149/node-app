const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Jenkins & PM2 deployed Node.js App through jenkins cicd pipeline!, this is my second chnage');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
