import styles from "../../commons/productCard/styles.module.scss";
import productService, { ProductType } from "@/src/services/productService";
import { SplideProps } from "@splidejs/react-splide";
import useSWR from "swr";
import ProductCard from "../../commons/productCard";
import SlideComponent from "../../commons/slideComponent";

const FeaturedProductsSlideSection = function () {
  const { error, data } = useSWR(
    "/featured",
    productService.getFeaturedProducts
  );
  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  const cards: JSX.Element[] = data.data.map((product: ProductType) => {
    return <ProductCard product={product} />;
  });

  let slideCount = 0;
  if (cards.length > 4) {
    slideCount = 4;
  } else {
    slideCount = cards.length;
  }

  const options: SplideProps = {
    options: {
      type: "loop",
      perPage: slideCount,
      perMove: 1,
      width: slideCount * 300,
      gap: "10px",
      pagination: false,
      breakpoints: {
        1210: {
          perPage: 3,
          width: 900,
        },
        910: {
          perPage: 2,
          width: 600,
        },
        770: {
          width: "90%",
        },
      },
    },
  };

  return (
    <>
      <p className={styles.sectionTitle}>
        De uma olhada em alguns de nossos produtos
      </p>
      <SlideComponent cards={cards} splideProps={options} />
    </>
  );
};

export default FeaturedProductsSlideSection;
