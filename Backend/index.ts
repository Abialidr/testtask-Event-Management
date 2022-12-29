import express from 'express';
const app = express();

import db from './Start/DB';
import cors from './Start/Security';
import routes from './Start/Routes';

app.use("/public", express.static("Images"));


cors(app);
db();
routes(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`listen on port ${port}...`);
});

export default server;
