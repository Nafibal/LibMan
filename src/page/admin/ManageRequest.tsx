import { useEffect, useState } from "react";
import styles from "./ManageRequest.module.scss";
import { confirmTransaction, getTransactions } from "../../utils";
import { Transaction } from "../../types";
import Tables from "../../components/dashboard/Tables";
import { Timestamp } from "@firebase/firestore";
const ManageRequest = () => {
  const [borrowTransactions, setBorrowTransactions] = useState<Transaction[]>(
    []
  );
  const [returnTransaction, setReturnTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions("pending").then((res) => {
      const borrowTrans = res.filter(
        (item) => item["transaction type"] == "borrow"
      );
      const returnTrans = res.filter(
        (item) => item["transaction type"] == "return"
      );
      setBorrowTransactions(borrowTrans);
      setReturnTransaction(returnTrans);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Borrow</h1>
      <Tables>
        <thead>
          <tr>
            <th>User</th>
            <th>Books</th>
            {/* <th>status</th> */}
            <th>transaction date</th>
            <th>Due date</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {borrowTransactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.user.name}</td>
                <td>{transaction.book.title}</td>
                {/* <td>{transaction.status}</td> */}
                <td>
                  {transaction["transaction date"].toDate().toDateString()}
                </td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
                <td>
                  <button
                    onClick={() =>
                      confirmTransaction(
                        transaction.id as string,
                        transaction["transaction type"],
                        "confirm",
                        transaction.book.id as string
                      ).then(() => {
                        alert("Succeed");
                        location.reload();
                      })
                    }
                  >
                    accept
                  </button>
                  <button
                    onClick={() =>
                      confirmTransaction(
                        transaction.id as string,
                        transaction["transaction type"],
                        "reject",
                        transaction.book.id as string
                      ).then(() => {
                        alert("Succeed");
                        location.reload();
                      })
                    }
                  >
                    reject
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>

      <h1>Return</h1>
      <Tables>
        <thead>
          <tr>
            <th>User</th>
            <th>Books</th>
            {/* <th>status</th> */}
            <th>return date</th>
            <th>Due date</th>
            <th>fine amounts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {returnTransaction.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.user.name}</td>
                <td>{transaction.book.title}</td>
                {/* <td>{transaction.status}</td> */}
                <td>
                  {(transaction["return date"] as Timestamp)
                    .toDate()
                    .toDateString()}
                </td>
                <td>{transaction["due date"].toDate().toDateString()}</td>
                <td>{transaction["fine amount"]}</td>
                <td>
                  <button
                    onClick={() =>
                      confirmTransaction(
                        transaction.id as string,
                        transaction["transaction type"],
                        "confirm",
                        transaction.book.id as string
                      ).then(() => {
                        alert("Succeed");
                        location.reload();
                      })
                    }
                  >
                    accept
                  </button>
                  <button
                    onClick={() =>
                      confirmTransaction(
                        transaction.id as string,
                        transaction["transaction type"],
                        "reject",
                        transaction.book.id as string
                      ).then(() => {
                        alert("Succeed");
                        location.reload();
                      })
                    }
                  >
                    reject
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      {/* {books.length !== 0 && <Tables type="books" data={books} />} */}
    </div>
  );
};

export default ManageRequest;
