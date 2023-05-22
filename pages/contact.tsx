import Footer from "@/src/components/commons/footer";
import styles from "../styles/contact.module.scss";
import Header from "@/src/components/commons/header";
import ToastComponent from "@/src/components/commons/toastComponent";
import mailService from "@/src/services/mailService";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import SpinnerComponent from "@/src/components/commons/spinner";

export default function Contact() {
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState(false);

  async function sendEmail(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setSending(true);

    const mailParams = {
      email: email,
      message: message,
    };

    const mail = await mailService.sendMail(mailParams);

    if (mail.status === 200) {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Mensagem Enviada, Obrigado pelo contato");

      setEmail("");
      setMessage("");
      setSending(false);
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Erro ao enviar a mensagem!");
      setSending(false);
    }
  }

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
        <Container className={styles.contentContainer}>
          <p className={styles.title}>
            Escreva uma mensagem para nós com alguma pergunta, reclamação ou
            sujestão que iremos lhe responder o mais breve possivel
          </p>
          {sending === true ? (
            <div className={styles.sendingDiv}>
              <p>Enviando a mensagem...</p>
              <SpinnerComponent />
            </div>
          ) : (
            <Form onSubmit={sendEmail} className={styles.form}>
              <FormGroup>
                <Label className={styles.label} for="email">
                  Seu email
                </Label>
                <Input
                  name="email"
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="email@email.com"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className={styles.label} for="message">
                  Mensagem
                </Label>
                <Input
                  name="message"
                  className={styles.input}
                  type="textarea"
                  maxLength={300}
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  placeholder="Maximo de 300 caracteres"
                  required
                />
              </FormGroup>
              <div className="text-center">
                <Button className={styles.sendBtn}>ENVIAR</Button>
              </div>
            </Form>
          )}
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
