
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
 * Get search result using existing search keyword id
 */
export let _getHistoryOfResult = (req: Request, res: Response) => {
    SearchResult.findOne({
        search_keyword: req.params.id
    }).populate('search_keyword').exec((err: any, search_result: Document) => {
        if (err) { return res.status(400).send(err); }
        return res.status(200).send({
            search_result: search_result,
            msg: "Get search_result list"
        });
    });
};