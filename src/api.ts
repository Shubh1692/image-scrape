import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongo from "connect-mongo";
import * as mongoose from "mongoose";

// Controllers (route handlers)
import * as searchController from "./controllers/search";
import * as searchResultController from "./controllers/search_results";

export const searchRouter = express.Router();
export const searchResultRouter = express.Router();
/**
 * user search api routes.
 */
searchRouter.route("/").get(searchController._getSearchHistory);
searchRouter.route("/:keyword").get(searchController._onSearch);
/**
 * user search result api routes.
 */
searchResultRouter.route("/:id").get(searchResultController._getHistoryOfResult);