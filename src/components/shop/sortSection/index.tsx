import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import styles from "./styles.module.scss";
import { useState } from "react";

interface props {
  handler: (dropdownItem: string) => void;
}

const SortSection = function ({ handler }: props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={styles.dropdown}
      >
        <DropdownToggle className={styles.dropdownToggle} caret>
          Ordenar por
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handler("name")}>Nome</DropdownItem>
          <DropdownItem onClick={() => handler("price>")}>
            Preço - maior {">"} menor
          </DropdownItem>
          <DropdownItem onClick={() => handler("price<")}>
            Preço - menor {"<"} maior
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default SortSection;
