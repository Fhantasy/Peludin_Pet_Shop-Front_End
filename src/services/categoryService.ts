import api from "./api";

export type CategoryType = {
  id: number;
  name: string;
};

const categoryService = {
  getAllCategories: async () => {
    const res = await api.get("/categories").catch((error) => {
      return error.response;
    });
    return res
  },
};

export default categoryService;
