import api from "./api";

interface RegisterParams {
  firstName: string;
  lastName: string;
  birth: string;
  email: string;
  password: string;
}

const AuthService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }
      return error;
    });
    console.log(res);
    return res;
  },
};

export default AuthService;
