import express from 'express';
import { Routes } from './routes';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', Routes);

app.listen(port, () => {
  console.log('server is running on port', port);
});
