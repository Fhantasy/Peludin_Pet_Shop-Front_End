import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/src/components/commons/header";
import PresentationSlideSection from "@/src/components/home/presentationSlideSection";
import FeaturedProductsSlideSection from "@/src/components/home/featuredProductsSlideSection";
import Footer from "@/src/components/commons/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToastComponent from "@/src/components/commons/toastComponent";

export default function Home() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function activeToast() {
    if (router.query.login === "true") {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Login realizado com sucesso!");
    }

    if (router.query.purchase === "true") {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Compra realizada com sucesso!");
    }
  }

  useEffect(() => {
    activeToast();
  }, [router.query]);
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
        <Footer />
        <ToastComponent
          color="bg-success"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
