import api from "./api";

interface UserParams {
  firstName: string;
  lastName: string;
  birth: string;
  email: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

interface AdressParams {
  state: string;
  city: string;
  district: string;
  street: string;
  houseNumber: string;
  phone: string;
}

const userService = {
  getCurrent: async () => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },

  updateUserInfos: async (params: UserParams) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.status;
  },

  updatePassword: async (params: PasswordParams) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .put("/users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getAdress: async () => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .get("/users/current/adress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  createAdress: async (params: AdressParams) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .post("/users/current/adress", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }
        return error;
      });
    return res;
  },

  updateAdress: async (params: AdressParams) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .put("/users/current/adress", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
};

export default userService;
