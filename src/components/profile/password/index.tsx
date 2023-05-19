import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import userService from "@/src/services/userService";
import ToastComponent from "../../commons/toastComponent";

const PasswordForm = function () {
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function update(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("As senhas são diferentes!");
      return;
    }
    const res = await userService.updatePassword({
      currentPassword,
      newPassword,
    });

    if (res.status === 204) {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Senha Alterada!");
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      console.log(res);
      setToastMessage(res.data.message);
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={update}>
        <div className={styles.formHead}>
          <p className={styles.formTitle}>Alterar a senha</p>
        </div>

        <div className={styles.formBody}>
          <FormGroup>
            <Label for="currentPassword">Senha atual</Label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              className={styles.input}
              minLength={6}
              placeholder="Digite sua senha atual..."
              onChange={(ev) => setCurrentPassword(ev.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Nova senha</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              className={styles.input}
              minLength={6}
              maxLength={20}
              placeholder="Digite uma nova senha..."
              onChange={(ev) => setNewPassword(ev.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmNewPassword">Confirmar a nova senha</Label>
            <Input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className={styles.input}
              minLength={6}
              maxLength={20}
              placeholder="Confirme sua nova senha..."
              onChange={(ev) => setConfirmNewPassword(ev.target.value)}
              required
            />
          </FormGroup>
          <div className="text-center">
            <Button className={styles.saveBtn}>Salvar Alteração</Button>
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

export default PasswordForm;
