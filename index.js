import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 1501;

app.listen(port, function(){
  console.log(`server is running on port ${port}`)
})