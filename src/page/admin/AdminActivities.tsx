import styles from "./AdminActivities.module.scss";
import { useEffect, useState } from "react";
import Tables from "../../components/dashboard/Tables";
import { getTransactions } from "../../utils";
import { Transaction } from "../../types";

const AdminActivities = () => {
  const [activeTransactions, setActiveTransactions] = useState<Transaction[]>(
    []
  );

  useEffect(() => {
    getTransactions("active").then((res) => {
      setActiveTransactions(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Active</h1>
      <Tables>
        <thead>
          <tr>
            <th>User</th>
            <th>Books</th>
            {/* <th>status</th> */}
            <th>Action</th>
            <th>transaction date</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody>
          {activeTransactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.user.name}</td>
                <td>{transaction.book.title}</td>
                {/* <td>{transaction.status}</td> */}
                <td>{transaction["transaction type"]}</td>
                <td>
                  {transaction["transaction date"].toDate().toDateString()}
                </td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};
export default AdminActivities;
