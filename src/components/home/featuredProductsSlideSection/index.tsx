import styles from "../../commons/productCard/styles.module.scss";
import productService, { ProductType } from "@/src/services/productService";
import { SplideProps } from "@splidejs/react-splide";
import useSWR from "swr";
import ProductCard from "../../commons/productCard";
import SlideComponent from "../../commons/slideComponent";
import SpinnerComponent from "../../commons/spinner";

const FeaturedProductsSlideSection = function () {
  const { error, data } = useSWR(
    "/featured",
    productService.getFeaturedProducts
  );
  if (error) return error;
  if (!data)
    return (
      <>
        <SpinnerComponent />
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
      width: slideCount * 260,
      gap: "10px",
      pagination: false,
      breakpoints: {
        1210: {
          perPage: 3,
          width: 780,
        },
        910: {
          perPage: 2,
          width: 450,
        },
        500: {
          width: 420,
        },
        439: {
          perPage: 1,
          width: 205,
        },
      },
    },
  };

  return (
    <>
      <div className="mb-5">
        <p className={styles.sectionTitle}>
          De uma olhada em alguns de nossos produtos
        </p>
        <SlideComponent cards={cards} splideProps={options} />
      </div>
    </>
  );
};

export default FeaturedProductsSlideSection;
