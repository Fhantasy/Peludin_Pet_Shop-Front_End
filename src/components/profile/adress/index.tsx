import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import userService from "@/src/services/userService";
import ToastComponent from "../../commons/toastComponent";

const AdressForm = function () {
  const [toastColor, setToastColor] = useState<string>("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [adressCreated, setAdressCreated] = useState(false);

  async function create(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const params = { state, city, district, street, houseNumber, phone };
    const adress = await userService.createAdress(params);
    console.log(adress);
    if (adress.status === 201) {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Endereço criado com sucesso!");

      setAdressCreated(true);
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Ocorreu um erro ao criar o endereço!");
    }
  }

  async function update(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const params = { state, city, district, street, houseNumber, phone };
    console.log(params);
    const adress = await userService.updateAdress(params);
    console.log(adress);
    if (adress.status === 204) {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Endereço Alterado com sucesso!");

      setAdressCreated(true);
    } else {
      setToastIsOpen(true);
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Ocorreu um erro ao alterar o endereço!");
    }
  }
  useEffect(() => {
    userService.getAdress().then((adress) => {
      if (adress.status === 404) {
        setAdressCreated(false);
        return;
      }
      setState(adress.data.state);
      setCity(adress.data.city);
      setDistrict(adress.data.district);
      setStreet(adress.data.street);
      setHouseNumber(adress.data.houseNumber);
      setPhone(adress.data.phone);

      setAdressCreated(true);
    });
  }, []);
  return (
    <>
      {adressCreated === true ? (
        <Form className={styles.form} onSubmit={update}>
          <div className={styles.formHead}>
            <p className={styles.formTitle}>Alterar o endereço</p>
          </div>
          <div className={styles.formBody}>
            <FormGroup>
              <Label for="state">Estado: </Label>
              <Input
                type="text"
                name="state"
                id="state"
                className={styles.input}
                maxLength={20}
                value={state}
                onChange={(ev) => setState(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">Cidade: </Label>
              <Input
                type="text"
                name="city"
                id="city"
                className={styles.input}
                maxLength={30}
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="district">Bairro: </Label>
              <Input
                type="text"
                name="district"
                id="district"
                className={styles.input}
                maxLength={30}
                value={district}
                onChange={(ev) => setDistrict(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="street">Rua: </Label>
              <Input
                type="text"
                name="street"
                id="street"
                className={styles.input}
                value={street}
                onChange={(ev) => setStreet(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="houseNumber">Numero: </Label>
              <Input
                type="number"
                name="houseNumber"
                id="houseNumber"
                className={styles.input}
                maxLength={5}
                value={houseNumber}
                onChange={(ev) => setHouseNumber(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Telefone: </Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                data-mask="[-]+55 (00) 00000-0000"
                className={styles.input}
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                required
              />
            </FormGroup>
            <div className="text-center">
              <Button className={styles.saveBtn}>Salvar Alterações</Button>
            </div>
          </div>
        </Form>
      ) : (
        <Form className={styles.form} onSubmit={create}>
          <div className={styles.formHead}>
            <p className={styles.formTitle}>Crie seu endereço</p>
          </div>
          <div className={styles.formBody}>
            <FormGroup>
              <Label for="state">Estado: </Label>
              <Input
                type="text"
                name="state"
                id="state"
                className={styles.input}
                maxLength={20}
                placeholder="Digite seu estado..."
                value={state}
                onChange={(ev) => setState(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">Cidade: </Label>
              <Input
                type="text"
                name="city"
                id="city"
                className={styles.input}
                maxLength={30}
                placeholder="Digite sua cidade..."
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="district">Bairro: </Label>
              <Input
                type="text"
                name="district"
                id="district"
                className={styles.input}
                maxLength={30}
                placeholder="Digite seu bairro..."
                value={district}
                onChange={(ev) => setDistrict(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="street">Rua: </Label>
              <Input
                type="text"
                name="street"
                id="street"
                className={styles.input}
                placeholder="Digite sua rua..."
                value={street}
                onChange={(ev) => setStreet(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="houseNumber">Numero: </Label>
              <Input
                type="number"
                name="houseNumber"
                id="houseNumber"
                className={styles.input}
                maxLength={5}
                placeholder="Digite o numero da residencia..."
                value={houseNumber}
                onChange={(ev) => setHouseNumber(ev.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Telefone: </Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                data-mask="[-]+55 (00) 00000-0000"
                className={styles.input}
                placeholder="Digite seu telefone..."
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                required
              />
            </FormGroup>
            <div className="text-center">
              <Button className={styles.saveBtn}>Salvar Alterações</Button>
            </div>
          </div>
        </Form>
      )}
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default AdressForm;
