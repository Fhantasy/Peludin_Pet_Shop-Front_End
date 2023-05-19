import { FormEvent, useEffect, useState } from "react";
import styles from "../styles.module.scss";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import userService from "@/src/services/userService";
import ToastComponent from "../../commons/toastComponent";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter();
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [maxDate, setMaxDate] = useState<string>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [email, setEmail] = useState("");
  const [created_at, setCreated_at] = useState("");

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

  async function update(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const res = await userService.updateUserInfos({
      firstName,
      lastName,
      birth,
      email,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Perfil alterado com sucesso!");
      if (email !== initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Voce não pode mudar para esse email!");
    }
  }

  useEffect(() => {
    getMaxDate();
    userService.getCurrent().then((user) => {
      setFirstName(user.data.firstName);
      setLastName(user.data.lastName);
      setBirth(user.data.birth);
      setEmail(user.data.email);
      setInitialEmail(user.data.email);
      setCreated_at(user.data.created_at);
    });
  }, []);

  return (
    <>
      <Form className={styles.form} onSubmit={update}>
        <div className={styles.formHead}>
          <p className={styles.formTitle}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.formBody}>
          <FormGroup>
            <Label for="firstName">Nome: </Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              className={styles.input}
              maxLength={20}
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
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
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
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
              value={birth ? birth.slice(0, 10) : ""}
              onChange={(ev) => setBirth(ev.target.value)}
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
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </FormGroup>

          <div className="text-center">
            <Button className={styles.saveBtn}>Salvar Alterações</Button>
          </div>
        </div>
      </Form>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default UserForm;
