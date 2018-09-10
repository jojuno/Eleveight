import apiExecute from '../common/apiExecute';
import { basename } from 'path';

const getSearchBarResults = (query, pgNum: number = 1) => apiExecute(`/api/search/${query}/${pgNum}`, "GET", null);

export const SearchBarResultsApi = {
    getSearchBarResults
}