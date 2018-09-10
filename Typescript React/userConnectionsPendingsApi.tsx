import apiExecute from '../common/apiExecute';
import { basename } from 'path';

const baseUrl = "/";

//id already injected into the api 
const getAllConnections = () => apiExecute(`${baseUrl}api/user/connections/connected`, "GET", null);

const getAllPendings = () => apiExecute(`${baseUrl}api/user/connections/pending`, "GET", null);


export const UserConnectionsPendingsApi = {
    getAllConnections,
    getAllPendings
}