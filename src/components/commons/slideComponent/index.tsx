import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";

const SlideComponent = function () {
  return (
    <>
      <Splide
        options={{
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
        }}
        className="mx-auto"
      >
        <SplideSlide>
          <SlideCard
            description="Serviço de banho e tosa para deixar seu companheiro mais fofinho e cheiroso!"
            imgUrl="/home/dog_shower.jpg"
          />
        </SplideSlide>
        <SplideSlide>
          <SlideCard
            description="Lojinha cheia de produtos para seu pet se divertir!"
            imgUrl="/home/dog_toy.png"
          />
        </SplideSlide>
        <SplideSlide>
          <SlideCard
            description="A 10 anos cuidando com carinho e dedicação do seu pet!"
            imgUrl="/home/cat_playing.jpg"
          />
        </SplideSlide>
      </Splide>
    </>
  );
};

export default SlideComponent;
