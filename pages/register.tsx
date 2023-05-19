import Footer from "@/src/components/commons/footer";
import styles from "../styles/registerLogin.module.scss";
import Header from "@/src/components/commons/header";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Toast,
} from "reactstrap";
import AuthService from "@/src/services/authService";
import { useRouter } from "next/router";
import ToastComponent from "@/src/components/commons/toastComponent";

export default function Register() {
  const router = useRouter();
  const [maxDate, setMaxDate] = useState<string>();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function getMaxDate() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);
    setMaxDate(
      `${maxDate.getFullYear()}-${(0 + maxDate.getMonth().toString()).slice(
        -2
      )}-${(0 + maxDate.getDate().toString()).slice(-2)}`
    );
  }

  async function register(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const firstName = formData.get("firstName")!.toString();
    const lastName = formData.get("lastName")!.toString();
    const birth = formData.get("birth")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();
    const params = { firstName, lastName, birth, email, password };

    if (password !== confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("As senhas não conferem!");
      return;
    }
    const data = await AuthService.register(params);

    if (data.status === 201) {
      router.push("/login?registred=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage(
        data.data ? data.data.message : "Erro ao registrar usuário"
      );
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("peludin-token")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    getMaxDate();
  }, []);

  return (
    <>
      <Head>
        <title>Peludin - Registro</title>
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
        <Container className="py-4">
          <Form className={styles.form} onSubmit={register}>
            <p className={styles.formTitle}>Crie a sua conta</p>

            <FormGroup>
              <Label for="firstName">Primeiro nome: </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                className={styles.input}
                maxLength={20}
                placeholder="Digite o seu nome..."
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Sobrenome: </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                className={styles.input}
                maxLength={30}
                placeholder="Digite o seu sobrenome..."
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth">Data de nascimento: </Label>
              <Input
                type="date"
                name="birth"
                id="birth"
                className={styles.input}
                min={"1930-01-01"}
                max={maxDate}
                required
              />
            </FormGroup>
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
                placeholder="Digite uma senha... (min-6 max-20)"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirmar senha: </Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={styles.input}
                minLength={6}
                maxLength={20}
                placeholder="Confirme a senha... (min-6 max-20)"
                required
              />
            </FormGroup>

            <div className="text-center">
              <Button className={styles.submitBtn}>Cadastrar</Button>
            </div>
          </Form>
        </Container>
        <Footer />
        <ToastComponent
          color="bg-danger"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
}
