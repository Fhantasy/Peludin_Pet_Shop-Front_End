import api from "./api";

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  featured: boolean;
  onSale: boolean;
  priceOnSale: number;
  categoryId: number;
};

const productService = {
  getFeaturedProducts: async () => {
    const res = await api.get("/products/featured").catch((error) => {
      return error.response;
    });
    return res;
  },
};

export default productService;
