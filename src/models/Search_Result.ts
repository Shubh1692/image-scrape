
import {
  Schema,
  model,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  Document
} from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate";
export interface SearchResultInterface extends Document {
  search_result: Array<any>;
};

const SearchResultSchema = new Schema({
  search_result: {
    type: Array,
    default: []
  },
  search_keyword: {
    type: Schema.Types.ObjectId,
    ref: 'Search',
    required: [true, 'Search Id is Require'],
  }
}, { timestamps: true });
SearchResultSchema.plugin(mongoosePaginate);
interface SearchResultModel<T extends Document> extends PaginateModel<T> { };
export const SearchResult: SearchResultModel<SearchResultInterface> = model<SearchResultInterface>('SearchResult', SearchResultSchema) as SearchResultModel<SearchResultInterface>;