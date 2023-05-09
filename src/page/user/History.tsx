import { useEffect, useState } from "react";
import Tables from "../../components/dashboard/Tables";
import styles from "./History.module.scss";
import { Book, Transaction } from "../../types";
import { getUserTransaction } from "../../utils";
import { getDoc, DocumentReference } from "@firebase/firestore";
import { Link } from "react-router-dom";
const History = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const userId = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    getUserTransaction(userId, "notActive").then((res) => {
      setTransactions(res);
    });
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>History</h1>
      <Tables>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Status</th>
            <th>Type</th>
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
                <td>{transaction["transaction type"]}</td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
                <td>
                  {transaction.status == "completed" && (
                    <Link to={`/addReview/${(transaction.book as Book).id}`}>
                      <button>Give Review</button>
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default History;
