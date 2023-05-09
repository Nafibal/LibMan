import styles from "./Home.module.scss";
import { FunctionComponent, useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, doc } from "@firebase/firestore";
import {
  addBook,
  deleteBook,
  getBooks,
  getUser,
  loanBook,
  updateBook,
} from "../../utils";
import { Book, User } from "../../types";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const navigate = useNavigate();

  // userId
  const userId: string = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    getUser(userId).then((res) => {
      setLoggedInUser(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Welcome, {loggedInUser?.name}</h1>
    </div>
  );
};

export default Home;
