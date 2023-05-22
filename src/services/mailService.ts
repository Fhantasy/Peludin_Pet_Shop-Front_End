import api from "./api";

interface MailParams {
  email: string;
  message: string;
}

const mailService = {
  sendMail: async (params: MailParams) => {
    const res = api.post("/contact/send-email", params).catch((error) => {
      return error.response;
    });

    return res;
  },
};

export default mailService;
