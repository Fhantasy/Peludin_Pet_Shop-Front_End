import { Splide, SplideProps, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

interface props {
  splideProps: SplideProps;
  cards: JSX.Element[];
}

const SlideComponent = function ({ splideProps, cards }: props) {
  return (
    <>
      <Splide options={splideProps.options} className="mx-auto">
        {cards.map((card) => (
          <SplideSlide>{card}</SplideSlide>
        ))}
      </Splide>
    </>
  );
};

export default SlideComponent;
