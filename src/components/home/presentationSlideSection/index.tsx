import { SplideProps } from "@splidejs/react-splide";
import SlideComponent from "../../commons/slideComponent";
import SlideCard from "./slideCard";

const cards = [
  <SlideCard
    description="Serviço de banho e tosa para deixar seu companheiro mais fofinho e cheiroso!"
    imgUrl="/home/dog_shower.jpg"
    cardLink="/services"
  />,

  <SlideCard
    description="Lojinha cheia de produtos para seu pet se divertir!"
    imgUrl="/home/dog_toy.png"
    cardLink="/shop"
  />,

  <SlideCard
    description="A 10 anos cuidando com carinho e dedicação do seu pet!"
    imgUrl="/home/cat_playing.jpg"
    cardLink="/about"
  />,
];

const options: SplideProps = {
  options: {
    type: "loop",
    width: "75%",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    speed: 1000,
    breakpoints: {
      500: {
        width: "90%",
      },
    },
  },
};

const PresentationSlideSection = function () {
  return (
    <>
      <SlideComponent cards={cards} splideProps={options} />
    </>
  );
};

export default PresentationSlideSection;
