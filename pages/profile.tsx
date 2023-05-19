import PasswordForm from "@/src/components/profile/password";
import styles from "../styles/profile.module.scss";
import Header from "@/src/components/commons/header";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import AdressForm from "@/src/components/profile/adress";
import userService from "@/src/services/userService";
import { useRouter } from "next/router";
import Purchases from "@/src/components/profile/purchases";
import Footer from "@/src/components/commons/footer";
import SpinnerComponent from "@/src/components/commons/spinner";

export default function Profile() {
  const router = useRouter();
  const [formName, setFormName] = useState("userInfos");
  const [authorized, setAuthorized] = useState(false);

  function switchInfos() {
    switch (formName) {
      case "userInfos":
        return <UserForm />;
      case "password":
        return <PasswordForm />;
      case "adress":
        return <AdressForm />;
      case "purchases":
        return <Purchases />;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    userService.getCurrent().then((user) => {
      if (user.status === 401) {
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    });
  }, []);

  useEffect(() => {
    if (router.query.adress === "true") {
      setFormName("adress");
    }
  }, [router.query]);

  if (!authorized) {
    return (
      <>
        <SpinnerComponent />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Peludin - Perfil</title>
        <script src="https://jsuites.net/v4/jsuites.js"></script>
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
        <Container className={styles.contentContainer}>
          <Row>
            <Col md={4} className={styles.btnColumn}>
              <p className={styles.title}>Minha Conta</p>

              <Button
                className={
                  formName === "userInfos"
                    ? styles.btnSelected
                    : styles.btnSwitch
                }
                onClick={() => setFormName("userInfos")}
              >
                Dados Cadastrais
              </Button>
              <Button
                className={
                  formName === "password"
                    ? styles.btnSelected
                    : styles.btnSwitch
                }
                onClick={() => setFormName("password")}
              >
                Senha
              </Button>
              <Button
                className={
                  formName === "adress" ? styles.btnSelected : styles.btnSwitch
                }
                onClick={() => setFormName("adress")}
              >
                Endereço
              </Button>
              <Button
                className={
                  formName === "purchases"
                    ? styles.btnSelected
                    : styles.btnSwitch
                }
                onClick={() => setFormName("purchases")}
              >
                Compras
              </Button>
            </Col>
            <Col>{switchInfos()}</Col>
          </Row>
        </Container>
        <Footer />
      </main>
    </>
  );
}
