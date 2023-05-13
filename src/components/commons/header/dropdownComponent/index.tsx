import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useRouter } from "next/router";

interface props {
  username: string;
}

const DropdownComponent = function ({ username }: props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggle() {
    setDropdownOpen((prevState) => !prevState);
  }

  function logout() {
    sessionStorage.clear();
    router.push("/");
  }

  return (
    <div className={styles.dropdownDiv}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className={styles.dropdownToogle} caret>
          {username}
        </DropdownToggle>
        <DropdownMenu>
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <DropdownItem>Perfil</DropdownItem>
          </Link>

          <DropdownItem onClick={logout}>Sair</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
