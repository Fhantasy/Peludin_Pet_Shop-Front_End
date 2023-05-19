import styles from "./styles.module.scss";
import { Button, Form, Input } from "reactstrap";
import InputMask from "react-input-mask";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import ToastComponent from "../../commons/toastComponent";
import { useRouter } from "next/router";

interface props {
  totalPrice?: string;
  productsQuantities: string;
}

const CartInfos = function ({ totalPrice, productsQuantities }: props) {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
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

  function handleBuy() {
    sessionStorage.setItem("products-quantities", productsQuantities);
    router.push("/checkout");
  }

  return (
    <>
      <div className={styles.infosDiv}>
        <Form className={styles.cepForm} onSubmit={(ev) => fretCalc(ev)}>
          <Input
            className={styles.inputCep}
            name="cep"
            data-mask="00000-000"
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
        <Button
          className={styles.buyBtn}
          disabled={productsQuantities ? false : true}
          onClick={handleBuy}
        >
          Finalizar a compra
        </Button>
      </div>
      <ToastComponent
        color="bg-danger"
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default CartInfos;
