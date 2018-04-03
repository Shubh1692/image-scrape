
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
/**
 * GET /search
 */
export let _getSearchHistory = (req: Request, res: Response) => {
    Search.paginate({}, {page: req.query.page, limit: 10}, (err: any, search: PaginateResult<SearchInterface>) => {
        if (err) { return res.status(400).send(err); }
        return res.status(200).send({
            search: search,
            msg: "Get search list"
        });
    });
};

/**
 * GET /search/:keyword
 */
export let _onSearch = (req: Request, res: Response) => {
    return res.status(200).send({
        search: req.params.keyword,
        msg: "Get search result"
    });
};