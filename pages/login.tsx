import Footer from "@/src/components/commons/footer";
import styles from "../styles/registerLogin.module.scss";
import Header from "@/src/components/commons/header";
import Head from "next/head";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import ToastComponent from "@/src/components/commons/toastComponent";
import AuthService from "@/src/services/authService";

export default function Login() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  async function login(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const res = await AuthService.login(params);

    if (res.status === 200) {
      if (router.query.checkout === "true") {
        router.push("/checkout");
      } else {
        router.push("/?login=true");
      }
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage(
        res.response ? res.response.data.message : "Erro ao fazer login!"
      );
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("peludin-token")) {
      router.push("/?login=true");
    }
  }, []);

  useEffect(() => {
    if (router.query.registred === "true") {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Cadastro realizado com sucesso!");
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Peludin - Login</title>
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
        <Container className={`${styles.formContainer} py-4`}>
          <Form className={styles.form} onSubmit={login}>
            <p className={styles.formTitle}>Bem Vindo</p>

            <FormGroup>
              <Label for="email">Email: </Label>
              <Input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                placeholder="Digite o seu email..."
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha: </Label>
              <Input
                type="password"
                name="password"
                id="password"
                className={styles.input}
                minLength={6}
                maxLength={20}
                placeholder="Digite sua senha..."
                required
              />
            </FormGroup>
            <div className="text-center">
              <Button className={styles.submitBtn}>Entrar</Button>
            </div>
          </Form>
        </Container>
        <Footer />
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
