import styles from "./styles.module.scss";
import purchaseService, {
  PurchaseType,
  PurchasesType,
} from "@/src/services/purchaseService";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Purchases = function () {
  const [purchases, setPurchases] = useState<PurchasesType>();
  const [purchase, setPurchase] = useState<PurchaseType>();
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleDateString(stringDate?: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      return date.toLocaleDateString();
    }
  }

  async function getPurchase(id: number) {
    const purchase = await purchaseService.getOne(id);
    setPurchase(purchase.data);
  }

  useEffect(() => {
    purchaseService.getAll().then((purchases) => {
      setPurchases(purchases.data);
    });
  }, []);

  if (purchases?.length === 0) {
    return (
      <>
        <div className="pt-5 pb-5">
          <p className={styles.notPurchasesTitle}>
            Você não fez nenhuma compra ainda
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={styles.purchasesDiv}>
        {purchases?.map((purchase, index) => (
          <div
            key={index}
            className={styles.purchase}
            onClick={() => {
              handleModalOpen();
              getPurchase(purchase.purchase.id);
            }}
          >
            <p>Id da compra: {purchase.purchase.id}</p>
            <p>
              Data da Compra: {handleDateString(purchase.purchase.createdAt)}
            </p>
            <p>Quantidade de items: {purchase.products.length} unidade(s)</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlayModal}
      >
        <div>
          <span className={styles.title}>Id da Compra:</span>{" "}
          <span className={styles.value}>{purchase?.purchase.id}</span>
          <br />
          <span className={styles.title}>Data da Compra:</span>{" "}
          <span className={styles.value}>
            {handleDateString(purchase?.purchase.createdAt)}
          </span>
          <br />
          <span className={styles.title}>Preço Total:</span>{" "}
          <span className={styles.value}>
            R$ {purchase?.purchase.totalPrice}
          </span>
        </div>
        <div>
          <p className={styles.title}>Items:</p>
          <div className={styles.productsDiv}>
            {purchase?.products.map((product) => (
              <p className={styles.product}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.productQuantity}>
                  {product.quantity} unidade(s)
                </span>
              </p>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Purchases;
