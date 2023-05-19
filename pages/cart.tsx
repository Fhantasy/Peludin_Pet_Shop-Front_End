import Head from "next/head";
import styles from "../styles/cart.module.scss";
import Header from "@/src/components/commons/header";
import ProductCartCard from "@/src/components/cart/productCartCard";
import productService from "@/src/services/productService";
import { useEffect, useState } from "react";
import CartInfos from "@/src/components/cart/cartInfos";
import Footer from "@/src/components/commons/footer";
import { Container } from "reactstrap";

export default function Cart() {
  const [idList, setIdList] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>();
  const [productIdsQuantitites, setProductIdsQuantitites] =
    useState<string>("");
  const [cartUpdate, setCartUpdate] = useState<boolean>(false);

  function getIdList() {
    const ids = productService.getCookie("product=");
    if (ids) {
      setIdList(ids.valuesList);
    } else {
      setIdList([]);
    }
  }

  function getTotalPrice(totalPrice: string) {
    setTotalPrice(totalPrice);
  }

  function getProductsQuantities(idsQuantities: string) {
    setProductIdsQuantitites(idsQuantities);
  }

  function cartHasUpdated(updated: boolean) {
    setCartUpdate(updated);
  }

  useEffect(() => {
    getIdList();
  }, [cartUpdate]);

  return (
    <>
      <Head>
        <title>Peludin - Carrinho</title>
        <script src="https://jsuites.net/v4/jsuites.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@500&family=Chango&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <Header cartUpdated={cartUpdate} />
        <Container className={styles.contentContainer}>
          <ProductCartCard
            productsQuantities={getProductsQuantities}
            productIds={idList}
            productsTotalPrice={getTotalPrice}
            cartHasUpdated={cartHasUpdated}
          />
          <CartInfos
            totalPrice={totalPrice}
            productsQuantities={productIdsQuantitites}
          ></CartInfos>
        </Container>
        <Footer />
      </main>
    </>
  );
}
