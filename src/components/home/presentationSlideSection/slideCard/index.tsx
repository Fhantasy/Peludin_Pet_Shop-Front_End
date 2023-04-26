import Link from "next/link";
import styles from "./styles.module.scss";

export interface props {
  description: string;
  imgUrl: string;
  cardLink: string;
}

const SlideCard = function ({ description, imgUrl, cardLink }: props) {
  return (
    <>
      <Link href={cardLink} style={{ textDecoration: "none" }}>
        <div className={styles.cardDiv}>
          <p className={styles.cardDescription}>{description}</p>
          <img src={imgUrl} alt="imgCard" className={styles.cardImg} />
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
