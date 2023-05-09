import { useEffect, useState } from "react";
import Tables from "../../components/dashboard/Tables";
import styles from "./Activities.module.scss";
import { Book, Transaction } from "../../types";
import { getTransactions, getUserTransaction, returnBook } from "../../utils";
import {
  doc,
  getDoc,
  DocumentData,
  DocumentReference,
} from "@firebase/firestore";

const Activities = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const userId = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    getUserTransaction(userId, "active").then((res) => {
      setTransactions(res);
    });
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>Activities</h1>
      <Tables>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{(transaction.book as Book).title}</td>
                <td>{transaction.status}</td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
                <td>
                  <button
                    onClick={() => {
                      returnBook(
                        userId,
                        transaction.book.id as string,
                        transaction.id as string
                      ).then(() => {
                        alert("submission submitted");
                        location.reload();
                      });
                    }}
                  >
                    return
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default Activities;
