import styles from "../../styles/search.module.scss";
import Header from "@/src/components/commons/header";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Container, Input } from "reactstrap";
import productService, { ProductType } from "@/src/services/productService";
import ProductCard from "@/src/components/commons/productCard";
import { useEffect, useState } from "react";
import SearchSection from "@/src/components/commons/searchSection";
import PaginationSection from "@/src/components/shop/paginationSection";
import { off } from "process";
import Footer from "@/src/components/commons/footer";

export default function Search() {
  const router = useRouter();
  const searchName = router.query.name;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [searchProducts, setSearchProducts] = useState<ProductType[]>();
  const [paginatedProducts, setPaginatedProducts] = useState<ProductType[]>();

  const getSearchProducts = async () => {
    if (typeof searchName === "string") {
      const res = await productService.getSearch(searchName);
      setSearchProducts(res.data);
    }
  };

  const paginateProducts = () => {
    if (searchProducts) {
      if (searchProducts.length % 10 > 0) {
        const count = Math.floor(searchProducts.length / 10) + 1;
        setTotalPageNumber(count);
      } else {
        const count = searchProducts.length / 10;
        setTotalPageNumber(count);
      }

      const offset = 10 * (pageNumber - 1);

      setPaginatedProducts(searchProducts.slice(offset, offset + 10));
    }
  };

  function getPageNumber(number: number) {
    setPageNumber(number);
  }

  function backToShop() {
    router.push("/shop");
  }

  useEffect(() => {
    getSearchProducts();
  }, [searchName]);

  useEffect(() => {
    paginateProducts();
  }, [searchProducts, pageNumber]);

  return (
    <>
      <Head>
        <title>{searchName}</title>
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
        <Header />
        <div className={styles.productsContainer}>
          <div className={styles.searchHeader}>
            <Button className={styles.backBtn} onClick={backToShop}>
              Voltar para a loja
            </Button>
            <SearchSection />
          </div>

          {paginatedProducts && paginatedProducts.length > 0 ? (
            <>
              <div className={styles.productsDiv}>
                {paginatedProducts?.map((product: ProductType) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className={styles.pagination}>
                <PaginationSection
                  currentPageNumber={getPageNumber}
                  totalPageNumber={totalPageNumber}
                />
              </div>
            </>
          ) : (
            <p className={styles.notFound}>Nenhum resultado encontrado :(</p>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
