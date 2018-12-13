import apiExecute from '../common/apiExecute';

const baseUrl = "/api/privacyPolicies"

const getPrivacyPolicies = () => {
    return apiExecute(`${baseUrl}`, "GET", null);
}

const postPrivacyPolicy = (data) => {
    return apiExecute(`${baseUrl}`, "POST", data);
}

const getPrivacyPolicyById = (id) => {
    return apiExecute(`${baseUrl}/${id}`, "GET", null)
}

const editPrivacyPolicy = (data) => {
    return apiExecute(`${baseUrl}/${data.id}`, "PUT", data)
}

const deletePrivacyPolicy = (id) => {
    return apiExecute(`${baseUrl}/${id}`, "DELETE", null)
}

export const PrivacyPolicyApi = {
    getPrivacyPolicies,
    postPrivacyPolicy,
    getPrivacyPolicyById,
    editPrivacyPolicy,
    deletePrivacyPolicy
}
