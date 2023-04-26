import { ProductType } from "@/src/services/productService";
import styles from "./styles.module.scss";
import Link from "next/link";

interface props {
  product: ProductType;
}

const ProductCard = function ({ product }: props) {
  return (
    <>
      <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <div className={styles.productCard}>
          <p className={styles.productName}>{product.name}</p>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${product.imgUrl}`}
            alt={`${product.name}Img`}
            className={styles.productImg}
          />
          {product.onSale ? (
            <p className={styles.oldPrice}>De R${product.price} por:</p>
          ) : (
            <></>
          )}
          {product.onSale ? (
            <p className={styles.priceOnSale}>R${product.priceOnSale}</p>
          ) : (
            <p className={styles.price}>R${product.price}</p>
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
