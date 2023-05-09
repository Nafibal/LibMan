import styles from "./AdminHome.module.scss";
import React, { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { User } from "../../types";

const AdminHome = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const navigate = useNavigate();

  const userId: string = JSON.parse(localStorage.getItem("userId") as string);

  return (
    <div className={styles.container}>
      <h1>Welcome, Admin</h1>
    </div>
  );
};

export default AdminHome;
