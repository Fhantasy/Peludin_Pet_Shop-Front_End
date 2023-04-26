import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/src/components/commons/header";
import SlideComponent from "@/src/components/commons/slideComponent";
import PresentationSlideSection from "@/src/components/home/presentationSlideSection";
import FeaturedProductsSlideSection from "@/src/components/home/featuredProductsSlideSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Peludin - Home</title>
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
        <Header></Header>
        <PresentationSlideSection />
        <FeaturedProductsSlideSection />
      </main>
    </>
  );
}
