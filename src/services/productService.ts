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

  getOneProduct: async (id: string) => {
    const res = await api.get(`/products/${id}`).catch((error) => {
      return error.response;
    });
    return res;
  },
  getAllProducts: async () => {
    const res = await api.get("/products/all").catch((error) => {
      return error.response;
    });
    return res;
  },

  getSearch: async (name: string) => {
    const res = await api
      .get(`/products/search?name=${name}`)
      .catch((error) => {
        return error.response;
      });
    return res;
  },

  getProductsByCategory: function (
    productList: ProductType[],
    categoryId: number | string
  ) {
    const productsByCategory: ProductType[] = productList.filter(
      (product: ProductType) => {
        if (categoryId !== undefined) {
          if (categoryId === "all") {
            return product;
          }
          if (categoryId === "onsale" && product.onSale === true) {
            return product;
          }
          if (product.categoryId === Number(categoryId)) {
            return product;
          }
          return;
        } else {
          return product;
        }
      }
    );
    return productsByCategory;
  },

  sortProducts: function (
    productList: ProductType[],
    sortBy: string,
    getProductsByCategory: (
      products: ProductType[]
    ) => ProductType[] | undefined
  ) {
    if (sortBy === "name") {
      productList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      getProductsByCategory(productList);
    }
    if (sortBy === "price>") {
      productList.sort((a, b) => {
        if (
          (a.onSale ? a.priceOnSale : a.price) <
          (b.onSale ? b.priceOnSale : b.price)
        )
          return 1;
        if (
          (a.onSale ? a.priceOnSale : a.price) >
          (b.onSale ? b.priceOnSale : b.price)
        )
          return -1;
        return 0;
      });
      getProductsByCategory(productList);
    }
    if (sortBy === "price<") {
      productList.sort((a, b) => {
        if (
          (a.onSale ? a.priceOnSale : a.price) <
          (b.onSale ? b.priceOnSale : b.price)
        )
          return -1;
        if (
          (a.onSale ? a.priceOnSale : a.price) >
          (b.onSale ? b.priceOnSale : b.price)
        )
          return 1;
        return 0;
      });
      getProductsByCategory(productList);
    }
  },

  getCookie: function (key: string) {
    const cookies = document.cookie;
    if (cookies.indexOf(key) !== -1) {
      const cookieInitial = cookies.substring(
        cookies.indexOf(key),
        cookies.length
      );
      const cookie = cookieInitial.substring(
        0,
        cookieInitial.indexOf(";") === -1
          ? cookieInitial.length
          : cookieInitial.indexOf(";") - 1
      );

      if (cookie) {
        const cookieValues = cookie.substring(
          cookie.indexOf("=") + 1,
          cookie.indexOf(";") === -1 ? cookie.length : cookie.indexOf(";")
        );
        const valuesList = cookieValues.split(" ");
        return { valuesList, cookie };
      }
    }
  },
};

export default productService;
