import api from "./api";

export type PurchaseType = {
  purchase: {
    id: number;
    totalPrice: number;
    userId: number;
    createdAt: string;
  };
  products: {
    quantity: number;
    id: 3;
    name: string;
    onSale: boolean;
    price: number;
    priceOnSale: number;
  }[];
};

export type PurchasesType = {
  purchase: {
    id: number;
    totalPrice: number;
    userId: number;
    createdAt: string;
  };
  products: {
    quantity: number;
    id: 3;
    name: string;
    onSale: boolean;
    price: number;
    priceOnSale: number;
  }[];
}[];

export interface PurchaseParams {
  totalPrice: string;
  products: {
    productId: string;
    quantity: string;
  }[];
}

const purchaseService = {
  getAll: async () => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .get("/purchases/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getOne: async (id: number) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .get(`/purchases/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  create: async (params: PurchaseParams) => {
    const token = sessionStorage.getItem("peludin-token");

    const res = await api
      .post("/purchases", params, {
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

export default purchaseService;
