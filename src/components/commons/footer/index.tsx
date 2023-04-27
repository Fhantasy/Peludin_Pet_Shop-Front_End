import styles from "./styles.module.scss";

const Footer = function () {
  return (
    <>
      <div className={styles.footerDiv}>
        <div className={styles.socialDiv}>
          <span className={styles.socialTitle}>
            Confira nossas redes sociais
          </span>
          <div>
            <a href="http://instagram.com" target="_blank">
              <img
                src="/instagram.svg"
                alt="instagram"
                className={styles.socialImg}
              />
            </a>
            <a href="http://whatsapp.com" target="_blank">
              <img
                src="/whatsapp.svg"
                alt="whatsapp"
                className={styles.socialImg}
              />
            </a>
            <a href="http://tiktok.com" target="_blank">
              <img
                src="/tiktok.svg"
                alt="tiktok"
                className={styles.socialImg}
              />
            </a>
          </div>
        </div>

        <p className={styles.credits}>Feito com &#x2764; por Alan S. Pereira</p>
      </div>
    </>
  );
};

export default Footer;
