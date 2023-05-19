import api from "./api";

interface RegisterParams {
  firstName: string;
  lastName: string;
  birth: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const AuthService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response?.status === 400) {
        return error.response;
      }
      return error;
    });
    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
      if (
        error.status === 400 ||
        error.status === 401 ||
        error.status === 404
      ) {
        return error.response;
      }
      return error;
    });
    if (res.status === 200) {
      sessionStorage.setItem("peludin-token", res.data.token);
    }
    return res;
  },
};

export default AuthService;
