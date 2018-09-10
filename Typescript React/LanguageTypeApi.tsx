import apiExecute from '../../common/apiExecute';
import { basename } from 'path';

const baseUrl = "/";

const getAllLanguageTypes = () => apiExecute(`${baseUrl}api/common/languagetypes`, "GET", null);

const getLanguageTypeById = id => apiExecute(`${baseUrl}api/common/languagetypes/${id}`, "GET", null);

const postLanguageType = model => apiExecute(`${baseUrl}api/common/languagetypes`, "POST", model);

const updateLanguageType = model => apiExecute(`${baseUrl}api/common/languagetypes/${model.id}`, "PUT", model);

const deleteLanguageType = id => apiExecute(`${baseUrl}api/common/languagetypes/${id}`, "DELETE", null);

export const LanguageTypeApi = {
    getAllLanguageTypes,
    getLanguageTypeById,
    postLanguageType,
    updateLanguageType,
    deleteLanguageType
}