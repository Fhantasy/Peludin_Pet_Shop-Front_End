import { Container, Button, Label } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import productService from "@/src/services/productService";
import DropdownComponent from "./dropdownComponent";
import userService from "@/src/services/userService";
interface props {
  cartUpdated?: boolean;
}

const Header = function ({ cartUpdated }: props) {
  const [cartCount, setCartCount] = useState(0);
  const [loged, setLoged] = useState(false);
  const [username, setUsername] = useState("");

  function getCartCount() {
    const cookie = productService.getCookie("product=");
    cookie ? setCartCount(cookie.valuesList.length) : setCartCount(0);
  }

  async function getCurrentUser() {
    const user = await userService.getCurrent();
    setUsername(user.data.firstName);
  }

  useEffect(() => {
    if (sessionStorage.getItem("peludin-token")) {
      setLoged(true);
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    getCartCount();
  }, [[], cartUpdated]);

  return (
    <>
      <div className={styles.headerDiv}>
        <Container className={styles.headerContainer}>
          <Link href="/">
            <img src="/LogoPeludin.png" alt="logo" className={styles.logo} />
          </Link>

          <p className={styles.headerDescription}>
            Seu pet merece todo carinho e cuidado
          </p>
          <div className={styles.btnDiv}>
            <Link href="/cart">
              <div className={styles.cartDiv}>
                <p className={styles.cartIconText}>
                  {cartCount && cartCount > 0 ? cartCount : ""}
                </p>
                <img
                  src="/cart-icon.png"
                  alt="cart-icon"
                  className={styles.cartIcon}
                />
              </div>
            </Link>
            {!loged ? (
              <>
                <Link href="/login" className={styles.btnLink}>
                  <Button className={styles.headerBtn}>Entrar</Button>
                </Link>
                <Link href="/register" className={styles.btnLink}>
                  <Button className={styles.headerBtn}>Registro</Button>
                </Link>
              </>
            ) : (
              <DropdownComponent username={username} />
            )}
          </div>
        </Container>
      </div>
      <div className={styles.navDiv}>
        <Container className={styles.navContainer}>
          <Link href="/services" style={{ textDecoration: "none" }}>
            <p className={styles.navText}>SERVIÇOS</p>
          </Link>
          <Link href="/shop" style={{ textDecoration: "none" }}>
            <p className={styles.navText}>LOJA</p>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <p className={styles.navText}>CONTATO</p>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <p className={styles.navText}>EMPRESA</p>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default Header;
