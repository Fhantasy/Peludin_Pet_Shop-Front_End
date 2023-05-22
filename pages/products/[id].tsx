import styles from "../../styles/product.module.scss";
import Footer from "@/src/components/commons/footer";
import Header from "@/src/components/commons/header";
import productService, { ProductType } from "@/src/services/productService";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";

export default function ProductPage() {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState<ProductType>();
  const [cartHasUpdated, setCartHasUpdated] = useState<boolean>(false);
  const [cartErrorMessage, setCartErrorMessage] = useState("");

  async function getProducts() {
    if (typeof id === "string") {
      const res = await productService.getOneProduct(id);
      setProduct(res.data);
    }
  }

  function coockieCreation() {
    const cookies = document.cookie;
    let cookieContent = "";

    if (cookies.indexOf("product=") === -1) {
      cookieContent = `product=${product?.id};`;
    } else {
      const cookie = productService.getCookie("product=");

      if (cookie) {
        const valueAlreadyExists = cookie.valuesList.find(
          (value) => value === product?.id.toString()
        );

        if (valueAlreadyExists) {
          throw new Error("Esse produto ja está no carrinho!");
        }
        cookieContent = `${cookie.cookie} ${product?.id};`;
      }
    }

    const path = "path=/;";
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 1);
    const coockieExpiration = `expires=${expirationDate};`;

    setCartHasUpdated(true);
    document.cookie = cookieContent + coockieExpiration + path;
  }

  async function cartError(error: Error) {
    setCartErrorMessage(error.message);
    setTimeout(() => {
      setCartErrorMessage("");
    }, 3000);
  }

  useEffect(() => {
    if (!product) getProducts();
  }, [[], product]);

  if (!product) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Peludin - {product.name}</title>
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
        <Header cartUpdated={cartHasUpdated} />
        <div className={styles.mainContent}>
          <Container className={styles.productContainer}>
            <img
              src={`${process.env.NEXT_PUBLIC_BASEURL}/${product.imgUrl}`}
              alt={product.name}
              className={styles.productImg}
            />

            <div className={styles.contentDiv}>
              <div>
                <p className={styles.productName}>{product.name}</p>
                {product.description.split("\n").map((line, index) => (
                  <p className={styles.productDescription} key={index}>
                    {line}
                  </p>
                ))}
              </div>

              <div className={styles.priceAndBtnDiv}>
                {product.onSale ? (
                  <>
                    <p
                      className={styles.oldPrice}
                    >{`De R$ ${product.price.toFixed(2)} por`}</p>{" "}
                    <p
                      className={styles.onSalePrice}
                    >{`R$ ${product.priceOnSale.toFixed(2)}`}</p>
                  </>
                ) : (
                  <p className={styles.price}>{`R$ ${product.price.toFixed(
                    2
                  )}`}</p>
                )}
                <Button
                  className={styles.cartButton}
                  onClick={() => {
                    try {
                      coockieCreation();
                    } catch (error) {
                      if (error instanceof Error) {
                        cartError(error);
                      }
                    }
                  }}
                >
                  Adicionar ao carrinho
                </Button>
                {cartErrorMessage !== "" ? (
                  <p className={styles.cartErrorMessage}>{cartErrorMessage}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </main>
    </>
  );
}
