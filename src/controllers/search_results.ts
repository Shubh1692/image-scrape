
import { SearchResult, SearchResultInterface } from "../models/Search_Result";
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
 * GET /search_result/:id
 */
export let _getHistoryOfResult = (req: Request, res: Response) => {
    SearchResult.paginate(req.params.id, { page: 1, limit: 15 }, (err: any, search_result: PaginateResult<SearchResultInterface>) => {
        if (err) { return res.status(400).send(err); }
        return res.status(200).send({
            search_result: search_result,
            msg: "Get search_result list"
        });
    });
};