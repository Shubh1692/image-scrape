
import { MAX_IMAGES } from "../app.config";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as _ from "lodash";
import { Search, SearchInterface } from "../models/Search";
import { SearchResult } from "../models/Search_Result";
import {
    Schema,
    model,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    Document
} from 'mongoose';
import * as request from "request";
import * as fs from "fs";
const Scraper = require('images-scraper')
    , google = new Scraper.Google();
const download = require('download-file');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
/**
 * GET /search/:keyword
 * Find keyword already exist in db
 * if yes then show saved result
 * otherwise call images-scraper google method, save files of result, compress result and overwrite save files and show to user
 */
export let _onSearch = (req: Request, res: Response) => {
    if (req.params && req.params.keyword && typeof req.params.keyword === 'string' && req.params.keyword.trim().length) {
        Search.findOne({
            search_keyword: req.params.keyword.toLowerCase()
        }).exec((err: any, doc: any) => {
            if (err) {
                return res.status(400).send(err);
            }
            if (doc) {
                SearchResult.findOne({
                    search_keyword: doc._id
                }).exec((err: any, doc: any) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    return res.status(200).send({
                        search: doc && doc.search_result ? doc.search_result : [],
                        msg: "Get search result"
                    });
                });
            } else {
                google.list({
                    keyword: req.params.keyword.toLowerCase(),
                    num: MAX_IMAGES,
                    detail: true,
                    nightmare: {
                        show: true
                    }
                })
                    .then((results: any) => {
                        const search = new Search({
                            search_keyword: req.params.keyword.toLowerCase()
                        });
                        search.save((err) => {
                            if (err) {
                                return res.status(400).send(err);
                            }
                            let source_files: Array<string> = [];
                            if (results.length) {
                                let search_result = results;
                                let not_found: any = [];
                                _.each(results, (result: any, resultIndex) => {
                                    var options = {
                                        directory: "./dist/uploads/",
                                        filename: new Date().getTime() + '.png'
                                    }
                                    download(result.url, options, (err: any) => {
                                        if (err) {
                                            search_result.deleted = true
                                            not_found.push(resultIndex);
                                        } else {
                                            source_files.push(options.directory + options.filename);
                                            search_result[resultIndex].local_file_name = options.filename;
                                        }

                                        if (source_files.length + not_found.length === results.length) {
                                            imagemin(source_files, "./dist/uploads/", {
                                                plugins: [
                                                    imageminJpegtran(),
                                                    imageminPngquant({ quality: '65-80' })
                                                ]
                                            }).then((files: any) => {
                                                search_result = _.reject(search_result, ['deleted', true])
                                                const searchResult = new SearchResult({
                                                    search_keyword: search._id,
                                                    search_result: search_result
                                                });
                                                searchResult.save((err) => {
                                                    if (err) {
                                                        return res.status(400).send(err);
                                                    }
                                                    return res.status(200).send({
                                                        search: search_result,
                                                        msg: "Get search result"
                                                    });
                                                });
                                            });
                                        }
                                    });
                                })
                            } else {
                                return res.status(200).send({
                                    search: [],
                                    msg: "Get search result"
                                });
                            }
                        });
                    }).catch((err: any) => {
                        return res.status(400).send(err);
                    });
            }
        });
    } else {
        res.status(400).send({
            msg: "Provide keyword for search"
        });
    }



};