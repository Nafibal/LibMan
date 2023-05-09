import { useEffect, useState } from "react";
import styles from "./AdminHistory.module.scss";
import { getTransactions } from "../../utils";
import { Transaction } from "../../types";
import Tables from "../../components/dashboard/Tables";
import { Timestamp } from "firebase/firestore";
const AdminHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions().then((res) => {
      const completed = res.filter((trans) => trans.status == "completed");
      setTransactions(completed);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>History</h1>
      <Tables>
        <thead>
          <tr>
            <th>Username</th>
            <th>Book</th>
            {/* <th>status</th> */}
            {/* <th>type</th> */}
            <th>return date</th>
            <th>due date</th>
            <th>fine amounts</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr>
                <td>{transaction.user.name}</td>
                <td>{transaction.book.title}</td>
                {/* <td>{transaction.status}</td> */}
                {/* <td>{transaction["transaction type"]}</td> */}
                <td>
                  {(transaction["return date"] as Timestamp)
                    .toDate()
                    .toDateString()}
                </td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
                <td>{transaction["fine amount"]}</td>
                {/* <td>action</td> */}
              </tr>
            );
          })}
        </tbody>
      </Tables>
      {/* {books.length !== 0 && <Tables type="books" data={books} />} */}
    </div>
  );
};

export default AdminHistory;
