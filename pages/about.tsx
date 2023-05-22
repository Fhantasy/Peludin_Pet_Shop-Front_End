import Head from "next/head";
import styles from "../styles/about.module.scss";
import Header from "@/src/components/commons/header";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Container,
} from "reactstrap";
import Footer from "@/src/components/commons/footer";

export default function About() {
  return (
    <>
      <Head>
        <title>Peludin - Sobre nós</title>
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
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <div className={styles.presentationDiv}>
            <p className={styles.title}>PELUDIN PET SHOP</p>
            <p className={styles.description}>
              A Peludin Pet Shop começou em 2010 com o objetivo de oferecer o
              melhor serviço possivel para pets, começando com 3 pessoas{" "}
              <strong>
                (Albert Eisntein - Proprietário, Isaac Newton - Proprietário,
                Charles Darwin - Sócio)
              </strong>{" "}
              e com essa filosofia hoje podemos oferecer um serviço completo e
              de qualidade. Temos 8 funcionários que oferecem serviços de{" "}
              <strong>Banho</strong>,<strong>Tosa</strong> e
              <strong>Veterinaria</strong> para deixar seu pet bonito e
              saudavel.
            </p>
          </div>
          <div className={styles.workersDiv}>
            <p className={styles.subtitle}>Funcionários</p>
            <div className={styles.workersCards}>
              <Card className={styles.card}>
                <img src="/about/NikolaTesla.webp" alt="" />
                <CardTitle>Nikola Tesla - Motorista</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/GalileuGalilei.webp" alt="" />
                <CardTitle>Galileu Galilei - Marketing</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/MarieCurie.webp" alt="" />
                <CardTitle>Marie Curie - Gerente de vendas</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/AlbertEinstein.webp" alt="" />
                <CardTitle>Albert Einstein - Proprietário</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/CharlesDarwin.webp" alt="" />
                <CardTitle>Charles Darwin - Veterinario</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/IsaacNewton.webp" alt="" />
                <CardTitle>Isaac Newton - Assistente Veterinario</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/LouisPasteur.webp" alt="" />
                <CardTitle>Louis Pasteur - Gerente</CardTitle>
              </Card>

              <Card className={styles.card}>
                <img src="/about/ThomasEdison.webp" alt="" />
                <CardTitle>Thomas Edison - Limpeza</CardTitle>
              </Card>
            </div>
          </div>
          <div className={styles.adressDiv}>
            <p>
              Peludin Pet Shop - Rua Albert Einstein, Bairro Centro, São Paulo,
              São Paulo
            </p>
            <img src="/whatsapp.svg" alt="whats" className={styles.whatsImg} />
            <span>(66) 11111-2222</span>
          </div>
        </Container>
        <Footer />
      </main>
    </>
  );
}
