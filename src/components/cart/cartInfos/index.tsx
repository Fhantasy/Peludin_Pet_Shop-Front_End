import styles from "./styles.module.scss";
import { Button, Form, Input } from "reactstrap";
import InputMask from "react-input-mask";
import { FormEvent, useState } from "react";

interface props {
  totalPrice?: string;
}

const CartInfos = function ({ totalPrice }: props) {
  const [value, setValue] = useState("");
  const [fretePrice, setFretePrice] = useState<string>();

  function handleChange(ev: FormEvent<HTMLInputElement>) {
    setValue(ev.currentTarget.value);
  }

  function fretCalc(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setFretePrice("Serviço indisponivel no momento!");
    setTimeout(() => {
      setFretePrice("");
    }, 3000);
  }

  return (
    <>
      <div className={styles.infosDiv}>
        <Form className={styles.cepForm} onSubmit={(ev) => fretCalc(ev)}>
          <InputMask
            className={styles.inputCep}
            name="cep"
            mask="99999-999"
            maskChar={""}
            placeholder="99999-999"
            required
            onChange={(ev) => handleChange(ev)}
          />
          <Button className={styles.cepCalcBtn}>Calcular Frete</Button>
        </Form>
        {fretePrice === "" ? (
          <p className={styles.notWork}></p>
        ) : (
          <p className={styles.notWork}>{fretePrice}</p>
        )}
        <p className={styles.totalPrice}>
          Preço total: R$ {totalPrice ? totalPrice : "0.00"}
        </p>
        <Button className={styles.buyBtn}>Finalizar a compra</Button>
      </div>
    </>
  );
};

export default CartInfos;
