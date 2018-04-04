import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongo from "connect-mongo";
import * as mongoose from "mongoose";

// Controllers (route handlers)
import * as searchController from "./controllers/search";
import * as searchResultController from "./controllers/search_results";
import * as imageScrapeController from "./controllers/image_scrape";
export const searchRouter = express.Router();
export const searchResultRouter = express.Router();
/**
 * user search api routes.
 */
searchRouter.route("/").get(searchController._getSearchHistory);
searchRouter.route("/:keyword").get(imageScrapeController._onSearch);
/**
 * user search result api routes.
 */
searchResultRouter.route("/:id").get(searchResultController._getHistoryOfResult);