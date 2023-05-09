import styles from "./Dashboard.module.scss";
import DashboardMenu from "../components/layouts/DashboardMenu";
import { Outlet, useNavigate } from "react-router-dom";
import ManageBook from "../page/admin/ManageBook";
import { useEffect, useState } from "react";
import { User } from "../types";
const AdminDashboard = () => {
  // const navigate = useNavigate();

  // const [loggedInUser, setLoggedInUser] = useState<User>();
  // useEffect(() => {
  //   getLoggedInUser(JSON.parse(localStorage.getItem("user") as string)).then(
  //     (res) => {
  //       setLoggedInUser(res);
  //       if (res.role == "user") {
  //         navigate("/");
  //       }
  //     }
  //   );
  // },[]);
  return (
    <div className={styles.container}>
      <DashboardMenu
        links={[
          {
            name: "Home",
            path: "/admin",
          },
          {
            name: "Manage Books",
            path: "/admin/books",
          },
          {
            name: "Manage Request",
            path: "/admin/request",
          },
          {
            name: "Activities",
            path: "/admin/activities",
          },
          {
            name: "History",
            path: "/admin/history",
          },
        ]}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
