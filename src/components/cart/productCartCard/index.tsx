import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import productService, { ProductType } from "@/src/services/productService";
import Link from "next/link";
import { Button, Input } from "reactstrap";

interface props {
  productsTotalPrice: (totalPrice: string) => void;
  cartHasUpdated: (updated: boolean) => void;
  productIds: string[];
}

const ProductCartCard = function ({
  productIds,
  productsTotalPrice,
  cartHasUpdated,
}: props) {
  const [productList, setProductList] = useState<ProductType[]>();
  const [quantity, setQuantity] = useState<{ [key: string]: number }>();

  function initialQuantities() {
    let quantityList: { [key: string]: number } = {};

    productIds.forEach((id) => {
      quantityList = { ...quantityList, [id]: 1 };
    });

    setQuantity(quantityList);
  }

  async function getProducts() {
    if (productIds) {
      const promises = productIds.map(async (id) => {
        const product = await productService.getOneProduct(id);
        return product.data;
      });
      return await Promise.all(promises);
    }
  }

  function getTotalPrice() {
    const price = productList?.reduce((sum, product) => {
      if (product.onSale) {
        return (
          sum +
          product.priceOnSale *
            Number(quantity ? quantity[product.id.toString()] : 1)
        );
      } else {
        return (
          sum +
          product.price * Number(quantity ? quantity[product.id.toString()] : 1)
        );
      }
    }, 0);
    productsTotalPrice(price?.toFixed(2) ? price.toFixed(2) : "0.00");
  }

  function removeProduct(id: number) {
    const cookieValues = productService.getCookie("product=");

    let expToRemove = new RegExp("");

    if (
      cookieValues?.valuesList[cookieValues?.valuesList.length - 1] !==
      id.toString()
    ) {
      expToRemove = RegExp(id.toString() + ".", "g");
    } else {
      expToRemove = RegExp(id.toString(), "g");
    }

    const cookieContent = cookieValues?.cookie.replace(expToRemove, "") + ";";

    const path = "path=/;";

    const today = new Date();
    const expirationDate = new Date();
    if (cookieValues?.valuesList.length === 1) {
      expirationDate.setDate(today.getDate() - 1);
    } else {
      expirationDate.setDate(today.getDate() + 1);
    }
    const coockieExpiration = `expires=${expirationDate};`;

    document.cookie = cookieContent + coockieExpiration + path;
  }

  useEffect(() => {
    initialQuantities();
    getProducts().then((res) => {
      setProductList(res);
    });
  }, [productIds]);

  useEffect(() => {
    getTotalPrice();
  }, [productList, quantity]);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  if (!productList || productList.length === 0) {
    return (
      <>
        <p className={styles.emptyCart}>
          Não tem nenhum produto em seu carrinho
        </p>
      </>
    );
  }
  return (
    <>
      <div className={styles.productsDiv}>
        {productList?.map((product, index) => (
          <div key={index} className={styles.cardDiv}>
            <img
              src={`${process.env.NEXT_PUBLIC_BASEURL}/${product.imgUrl}`}
              alt={product.name}
              className={styles.cardImg}
            />

            <div className={styles.descriptionDiv}>
              <Link
                href={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <p className={styles.productName}>{product.name}</p>
              </Link>

              <p className={styles.productPrice}>
                {`R$ ${
                  product.onSale
                    ? product.priceOnSale.toFixed(2)
                    : product.price.toFixed(2)
                }`}
              </p>
            </div>
            <div className={styles.actionsDiv}>
              <Button
                className={styles.removeBtn}
                onClick={() => {
                  removeProduct(product.id);
                  cartHasUpdated(true);
                  setTimeout(() => {
                    cartHasUpdated(false);
                  }, 500);
                }}
              >
                Remover
              </Button>
              <div className={styles.quantityDiv}>
                <p className={styles.quantityTitle}>
                  Quantidade:{" "}
                  <span className={styles.quantityNumber}>
                    {quantity ? quantity[product.id.toString()] : 1}
                  </span>
                </p>
                <div>
                  <p
                    className={styles.quantityIncrement}
                    onClick={() => {
                      let quantitiesList = { ...quantity };
                      quantitiesList[product.id.toString()] += 1;
                      setQuantity(quantitiesList);
                    }}
                  >
                    +
                  </p>
                  <p
                    className={styles.quantityIncrement}
                    onClick={() => {
                      let quantitiesList = { ...quantity };
                      if (quantitiesList[product.id.toString()] > 1) {
                        quantitiesList[product.id.toString()] -= 1;
                        setQuantity(quantitiesList);
                      }
                    }}
                  >
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCartCard;
