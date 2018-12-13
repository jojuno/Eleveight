import apiExecute from '../../common/apiExecute';
import { basename } from 'path';

const getAllOrganizationTypes = () => apiExecute(`/api/common/organizationtypes`, "GET", null);

const getOrganizationTypeById = id => apiExecute(`/api/common/organizationtypes/${id}`, "GET", null);

const postOrganizationType = model => apiExecute(`/api/common/organizationtypes`, "POST", model);

const updateOrganizationType = model => apiExecute(`/api/common/organizationtypes/${model.id}`, "PUT", model);

const deleteOrganizationType = id => apiExecute(`/api/common/organizationtypes/${id}`, "DELETE", null);

export const OrganizationTypeApi = {
    getAllOrganizationTypes,
    getOrganizationTypeById,
    postOrganizationType,
    updateOrganizationType,
    deleteOrganizationType
}
