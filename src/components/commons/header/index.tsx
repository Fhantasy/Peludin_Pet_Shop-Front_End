import { Container, Button } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";

const Header = function () {
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
            <Link href="/login">
              <Button className={styles.headerBtn}>Entrar</Button>
            </Link>
            <Link href="/register">
              <Button className={styles.headerBtn}>Registro</Button>
            </Link>
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
