import api from "@/src/services/api";
import styles from "./styles.module.scss";
import categoryService, { CategoryType } from "@/src/services/categoryService";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface props {
  handler: (id: string | number) => void;
}

const CategoriesSection = function ({ handler }: props) {
  const { error, data } = useSWR(
    "/categories",
    categoryService.getAllCategories
  );

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading</p>
      </>
    );
  return (
    <>
      <div className={styles.categoriesCard}>
        <p className={styles.categoriesTitle}>CATEGORIAS</p>
        <ul>
          {data.data.map((category: CategoryType) => (
            <li
              key={category.id}
              onClick={() => handler(category.id)}
              className={styles.categoryName}
            >
              {category.name}
            </li>
          ))}
          <li className={styles.categoryName} onClick={() => handler("onsale")}>
            Promoções
          </li>
        </ul>
        <p className={styles.showAll} onClick={() => handler("all")}>
          Todos os produtos
        </p>
      </div>
    </>
  );
};

export default CategoriesSection;
