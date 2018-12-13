import apiExecute from '../../common/apiExecute';
import { basename } from 'path';

const baseUrl = "/";

const getAllEducationLevelTypes = () => apiExecute(`${baseUrl}api/common/educationLeveltypes`, "GET", null);

const getEducationLevelTypeById = id => apiExecute(`${baseUrl}api/common/educationLeveltypes/${id}`, "GET", null);

const postEducationLevelType = model => apiExecute(`${baseUrl}api/common/educationLeveltypes`, "POST", model);

const updateEducationLevelType = model => apiExecute(`${baseUrl}api/common/educationLeveltypes/${model.id}`, "PUT", model);

const deleteEducationLevelType = id => apiExecute(`${baseUrl}api/common/educationLeveltypes/${id}`, "DELETE", null);

export const EducationLevelTypeApi = {
    getAllEducationLevelTypes,
    getEducationLevelTypeById,
    postEducationLevelType,
    updateEducationLevelType,
    deleteEducationLevelType
}
