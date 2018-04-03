import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongo from "connect-mongo";
import * as mongoose from "mongoose";
import * as expressValidator from "express-validator";
import * as cors from "cors";
import * as Routes from "./api";
import * as path from "path";


// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scrape_images';
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(expressValidator());
app.use('/', express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use('/uploads', express.static('./src/uploads/', { maxAge: 31557600000 }));
app.use('/search', Routes.searchRouter);
app.use('/search_result', Routes.searchResultRouter);
module.exports = app;