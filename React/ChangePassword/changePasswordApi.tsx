import apiExecute from '../common/apiExecute';

const changePassword = data => apiExecute(`/api/App/AppTokens/changePassword`, "PUT", data)


export const ChangePasswordApi = {
    changePassword
}