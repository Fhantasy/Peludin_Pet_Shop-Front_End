import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button, Form, Input } from "reactstrap";

const SearchSection = function () {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const searchHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/shop/search?name=${inputValue}`);
  };
  function onClickSubmit() {
    router.push(`/shop/search?name=${inputValue}`);
  }

  return (
    <>
      <Form onSubmit={searchHandle}>
        <div className={styles.searchDiv}>
          <Input
            type="search"
            className={styles.inputSearch}
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.currentTarget.value.toLocaleLowerCase())
            }
          />
          <Button
            type="submit"
            onSubmit={onClickSubmit}
            className={styles.inputButton}
          >
            Pesquisar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SearchSection;
