import Footer from "@/src/components/commons/footer";
import styles from "../../styles/shop.module.scss";
import Header from "@/src/components/commons/header";
import CategoriesSection from "@/src/components/shop/categoriesSection";
import ProductSection from "@/src/components/shop/productsSection";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import SortSection from "@/src/components/shop/sortSection";
import PaginationSection from "@/src/components/shop/paginationSection";
import SearchSection from "@/src/components/commons/searchSection";

export default function Shop() {
  const [categoryId, setCategoryId] = useState<string | number>();
  const [sortBy, setSortBy] = useState<string>();
  const [totalPageNumber, setTotalPageNumber] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function getTotalPageNumber(number: number) {
    setTotalPageNumber(number);
  }

  function getSortBy(option: string) {
    setSortBy(option);
  }

  function getCategoryId(id: number | string) {
    setCategoryId(id);
  }

  function getpageNumber(number: number) {
    setPageNumber(number);
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
      <main className={styles.main}>
        <Header />
        <Container>
          <SearchSection />
        </Container>

        <Container className={styles.shopContainer}>
          <CategoriesSection handler={getCategoryId} />
          <div>
            <SortSection handler={getSortBy} />
            <ProductSection
              categoryId={categoryId}
              sortBy={sortBy}
              totalPageNumberHandler={getTotalPageNumber}
              currentPageNumber={pageNumber}
            />
            <div className={styles.paginationDiv}>
              <PaginationSection
                totalPageNumber={totalPageNumber}
                currentPageNumber={getpageNumber}
              />
            </div>
          </div>
        </Container>

        <Footer />
      </main>
    </>
  );
}
