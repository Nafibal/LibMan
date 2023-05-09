// import { Book, Transaction } from "../../types";
import { ReactNode } from "react";
import styles from "./Tables.module.scss";

type Props = {
  children: ReactNode;
  //   type: string;
  //   data: Book[] | Transaction[];
};

const Tables = ({ children }: Props) => {
  return <table className={styles.table}>{children}</table>;
};

export default Tables;
