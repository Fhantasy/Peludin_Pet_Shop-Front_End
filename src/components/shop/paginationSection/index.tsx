import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "./styles.module.scss";
import { Ref, createRef, useEffect, useRef, useState } from "react";

interface props {
  totalPageNumber: number;
  currentPageNumber: (page: number) => void;
}

const PaginationSection = function ({
  totalPageNumber,
  currentPageNumber,
}: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);

  function changeClass() {
    const prevPage = document.getElementById(`number-${previousPage}`);
    const page = document.getElementById(`number-${currentPage}`);

    if (page) {
      if (page.classList.contains(styles.paginationItem)) {
        page.classList.replace(styles.paginationItem, styles.selected);
      } else {
        page.classList.replace(styles.selected, styles.paginationItem);
      }
    }

    if (prevPage) {
      if (prevPage.classList.contains(styles.paginationItem)) {
        prevPage.classList.replace(styles.paginationItem, styles.selected);
      } else {
        prevPage.classList.replace(styles.selected, styles.paginationItem);
      }
    }
    setPreviousPage(currentPage);
  }

  function resetCurrentPageNumber() {
    setCurrentPage(1);
  }

  useEffect(() => {
    currentPageNumber(currentPage);

    const page = document.getElementById(`number-1`);
    page?.classList.replace(styles.paginationItem, styles.selected);
  }, []);

  useEffect(() => {
    currentPageNumber(currentPage);
    changeClass();
  }, [currentPage]);

  useEffect(() => {
    resetCurrentPageNumber();
  }, [totalPageNumber]);

  let paginationList = [];

  for (let i = 1; i <= totalPageNumber; i++) {
    paginationList.push(
      <PaginationItem key={i}>
        <PaginationLink
          className={styles.paginationItem}
          id={`number-${i}`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <>
      <Pagination className={styles.paginationContainer}>
        <PaginationItem>
          <PaginationLink
            className={styles.paginationItem}
            first
            onClick={() => {
              setCurrentPage(1);
            }}
          />
        </PaginationItem>

        {currentPage === 1 ? (
          <></>
        ) : (
          <PaginationItem>
            <PaginationLink
              className={styles.paginationItem}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              previous
            />
          </PaginationItem>
        )}

        {paginationList.map((page) => (
          <>{page}</>
        ))}
        {currentPage === totalPageNumber ? (
          <></>
        ) : (
          <PaginationItem>
            <PaginationLink
              className={styles.paginationItem}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              next
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            className={styles.paginationItem}
            onClick={() => {
              setCurrentPage(totalPageNumber);
            }}
            last
          />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default PaginationSection;
