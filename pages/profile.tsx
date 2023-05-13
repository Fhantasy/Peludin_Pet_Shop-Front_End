import PasswordForm from "@/src/components/profile/password";
import styles from "../styles/profile.module.scss";
import Header from "@/src/components/commons/header";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import AdressForm from "@/src/components/profile/adress";

export default function Profile() {
  const [formName, setFormName] = useState("userInfos");

  function switchInfos() {
    switch (formName) {
      case "userInfos":
        return <UserForm />;
      case "password":
        return <PasswordForm />;
      case "adress":
        return <AdressForm />;
      default:
        return <></>;
    }
  }
  return (
    <>
      <Head>
        <title>Peludin - Home</title>
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
      <main>
        <Header />
        <Container>
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
            </Col>
            <Col>{switchInfos()}</Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
