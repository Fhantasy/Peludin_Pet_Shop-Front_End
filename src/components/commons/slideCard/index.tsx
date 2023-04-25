import styles from "./styles.module.scss";

export interface props {
  description: string;
  imgUrl: string;
}

const SlideCard = function ({ description, imgUrl }: props) {
  return (
    <>
      <div className={styles.cardDiv}>
        <p className={styles.cardDescription}>{description}</p>
        <img src={imgUrl} alt="imgCard" className={styles.cardImg} />
      </div>
    </>
  );
};

export default SlideCard;
