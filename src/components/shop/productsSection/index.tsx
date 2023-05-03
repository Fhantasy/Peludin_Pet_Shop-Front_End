import productService, { ProductType } from "@/src/services/productService";
import styles from "./style.module.scss";
import useSWR from "swr";
import ProductCard from "../../commons/productCard";
import { useEffect, useState } from "react";

interface props {
  categoryId?: string | number;
  sortBy?: string;
  totalPageNumberHandler?: (pageNumber: number) => void;
  currentPageNumber: number;
}

const ProductSection = function ({
  categoryId,
  sortBy,
  totalPageNumberHandler,
  currentPageNumber,
}: props) {
  const { error, data } = useSWR("/products", productService.getAllProducts);
  const [productList, setProductList] = useState<ProductType[]>(data?.data);

  function getProductsByCategory(productList: ProductType[]) {
    if (productList) {
      const productsByCategory = productService.getProductsByCategory(
        productList,
        categoryId || "all"
      );
      if (productsByCategory.length % 8 > 0) {
        const count = Math.floor(productsByCategory.length / 8) + 1;
        if (totalPageNumberHandler) totalPageNumberHandler(count);
      } else {
        const count = productsByCategory.length / 8;
        if (totalPageNumberHandler) totalPageNumberHandler(count);
      }

      const offset = 8 * (currentPageNumber - 1);

      setProductList(productsByCategory.slice(offset, offset + 8));
      return productsByCategory.slice(offset, offset + 8);
    }
  }

  function sortByFunction() {
    if (sortBy) {
      const products: ProductType[] = data.data;
      productService.sortProducts(products, sortBy, getProductsByCategory);
    }
  }

  useEffect(() => {
    getProductsByCategory(data?.data);
  }, [categoryId, data, currentPageNumber]);

  useEffect(() => {
    sortByFunction();
  }, [sortBy]);

  if (error) return error;
  if (!productList) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <div className={styles.productsDiv}>
        {productList.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductSection;
