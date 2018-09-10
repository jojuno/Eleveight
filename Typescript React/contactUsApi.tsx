import apiExecute from '../common/apiExecute';

const baseUrl = "/api/utilities/contactus"

const sendContactUs = (data) => {
    return apiExecute(`${baseUrl}`, "POST", data);
}

export const ContactUsApi = {
    sendContactUs
}