import Header from "@/src/components/commons/header";
import productService, { ProductType } from "@/src/services/productService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

export default function ProductPage() {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState<ProductType>();

  const getProduct = async () => {
    if (typeof id === "string") {
      const res = await productService.getOneProduct(id);
      setProduct(res.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
        <title>Peludin - Loja</title>
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
      <main>
        <Header />
        <Container>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${product.imgUrl}`}
            alt={product.name}
          />
          <p>{product.name}</p>
          <p>{product.description}</p>
          {product.onSale ? (
            <>
              <p>{`De ${product.price} por`}</p> <p>{product.priceOnSale}</p>
            </>
          ) : (
            <p>{product.price}</p>
          )}
        </Container>
      </main>
    </>
  );
}
