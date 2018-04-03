
import {
  Schema,
  model,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  Document
} from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate";
export interface SearchInterface extends Document {
  search_keyword: string;
};

const SearchSchema = new Schema({
  search_keyword: {
    type: String,
    required: [true, 'Search keyword is Require'],
  }
}, { timestamps: true });
SearchSchema.plugin(mongoosePaginate);
interface SearchModel<T extends Document> extends PaginateModel<T> { };
export const Search: SearchModel<SearchInterface> = model<SearchInterface>('Search', SearchSchema) as SearchModel<SearchInterface>;