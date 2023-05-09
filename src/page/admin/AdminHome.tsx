import React, { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { User } from "../../types";

const AdminHome = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const navigate = useNavigate();

  const userId: string = JSON.parse(localStorage.getItem("userId") as string);

  useEffect(() => {
    // getLoggedInUser(userId).then((res) => {
    //   setLoggedInUser(res);
    //   if (res.role == "user") {
    //     navigate("/");
    //   }
    // });
  }, []);

  return <div>AdminHome</div>;
};

export default AdminHome;
