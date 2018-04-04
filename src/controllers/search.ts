
import { Search, SearchInterface } from "../models/Search";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as _ from "lodash";
import {
    Schema,
    model,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    Document
} from 'mongoose';
import * as request from "request";
import { SEARCH_RESULT_LIMIT } from "../app.config";
/**
 * GET /search
 * Get search result by page with limit 10
 */
export let _getSearchHistory = (req: Request, res: Response) => {
    Search.paginate({}, { page: req.query.page, limit: SEARCH_RESULT_LIMIT}, (err: any, search: PaginateResult<SearchInterface>) => {
        if (err) { return res.status(400).send(err); }
        return res.status(200).send({
            search: search,
            msg: "Get search list"
        });
    });
};