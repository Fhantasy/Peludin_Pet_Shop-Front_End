import Head from "next/head";
import styles from "../styles/checkout.module.scss";
import Header from "@/src/components/commons/header";
import { useEffect, useState } from "react";
import productService, { ProductType } from "@/src/services/productService";
import userService, { AdressType } from "@/src/services/userService";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import Footer from "@/src/components/commons/footer";
import Link from "next/link";
import purchaseService from "@/src/services/purchaseService";
import ToastComponent from "@/src/components/commons/toastComponent";
import SpinnerComponent from "@/src/components/commons/spinner";

export default function Checkout() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [productsQuantities, setProductsQuantities] =
    useState<{ productId: string; quantity: string }[]>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [adress, setAdress] = useState<AdressType>();
  const [whitoutAdress, setWhitoutAdress] = useState(false);
  const [totalPrice, setTotalPrice] = useState("0.00");

  function getProductsQuantities() {
    const idsQuantitiesString = sessionStorage.getItem("products-quantities");
    if (idsQuantitiesString) {
      const idsQuantitiesList = idsQuantitiesString?.split(" ");
      idsQuantitiesList?.pop();
      const productsQuantities = idsQuantitiesList!.map((idQuantity) => {
        const idQuantityArray = idQuantity.split(",");

        return {
          productId: idQuantityArray[0],
          quantity: idQuantityArray[1],
        };
      });

      setProductsQuantities(productsQuantities);
    } else {
      router.push("/cart");
    }
  }

  async function getProducts() {
    if (productsQuantities) {
      const productsPromise = productsQuantities.map(
        async (productIdQuantity) => {
          const product = await productService.getOneProduct(
            productIdQuantity.productId
          );
          return product.data;
        }
      );

      const productsList = await Promise.all(productsPromise);
      setProducts(productsList);
    }
  }

  async function getAdress() {
    const adress = await userService.getAdress();
    if (adress.status === 404) {
      setWhitoutAdress(true);
    } else {
      setAdress(adress.data);
    }
  }

  function getTotalPrice() {
    const price = products.reduce((sum, product) => {
      if (product.onSale) {
        return (
          sum +
          product.priceOnSale *
            Number(
              productsQuantities?.find(
                (idQuantity) => Number(idQuantity?.productId) === product.id
              )?.quantity || 1
            )
        );
      } else {
        return (
          sum +
          product.price *
            Number(
              productsQuantities?.find(
                (idQuantity) => Number(idQuantity?.productId) === product.id
              )?.quantity || 1
            )
        );
      }
    }, 0);
    setTotalPrice(price?.toFixed(2) ? price.toFixed(2) : "0.00");
  }

  async function createPurchase() {
    const purchaseParams = {
      totalPrice: totalPrice,
      products: productsQuantities!.map((item) => item),
    };

    if (purchaseParams) {
      const purchase = await purchaseService.create(purchaseParams);

      if (purchase.status === 201) {
        sessionStorage.removeItem("products-quantities");

        const today = new Date();
        const expirationDate = new Date();
        expirationDate.setDate(today.getDate() - 1);
        document.cookie = `product=0;expires=${expirationDate};path=/`;

        router.push("/?purchase=true");
      } else {
        setToastIsOpen(true);
        setToastColor("bg-danger");
        setTimeout(() => {
          setToastIsOpen(false);
        }, 3000);
        setToastMessage("Erro ao finalizar a compra");
      }
    }
  }

  useEffect(() => {
    userService.getCurrent().then((user) => {
      if (user.status === 401) {
        router.push("/login?checkout=true");
      } else {
        setAuthorized(true);
      }
    });
    getProductsQuantities();
    getAdress();
  }, []);

  useEffect(() => {
    getProducts();
  }, [productsQuantities]);

  useEffect(() => {
    getTotalPrice();
    console.log(productsQuantities);
  }, [products]);

  if (!authorized || !productsQuantities) {
    return (
      <>
        <SpinnerComponent />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Peludin - Login</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@500&family=Chango&display=swap&family=Oswald&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className={styles.contentDiv}>
          <div className={styles.adressDiv}>
            <p className={styles.adressTitle}>Endereço:</p>
            {whitoutAdress ? (
              <>
                <div className="text-center">
                  <p>Você não criou um endereço ainda!</p>
                  <Link href="/profile?adress=true">
                    <Button className={styles.createAdressBtn}>
                      Criar Endereço
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className={styles.adressItem}>Estado: {adress?.state}</p>
                <p className={styles.adressItem}>Cidade: {adress?.city}</p>
                <p className={styles.adressItem}>Bairro: {adress?.district}</p>
                <p className={styles.adressItem}>Rua: {adress?.street}</p>
                <p className={styles.adressItem}>
                  Numero: {adress?.houseNumber}
                </p>
                <p className={styles.adressItem}>Telefone: {adress?.phone}</p>
              </>
            )}
          </div>
          <div className={styles.itensDiv}>
            <p className={styles.itensTitle}>Items</p>
            <div className={styles.itens}>
              {productsQuantities ? (
                productsQuantities.map((idQuantity, index) => (
                  <p key={index} className={styles.iten}>
                    <span className={styles.productName}>
                      {
                        products?.find(
                          (product) =>
                            product.id.toString() === idQuantity?.productId
                        )?.name
                      }
                    </span>

                    <span>{idQuantity?.quantity} unidade(s)</span>
                  </p>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>

          <p className={styles.totalPrice}>
            Preço total: <span>{totalPrice}</span>
          </p>
          <Button
            className={styles.buyBtn}
            onClick={createPurchase}
            disabled={adress ? false : true}
          >
            Comprar
          </Button>
        </div>
        <Footer />
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
