import styles from "./Dashboard.module.scss";
import DashboardMenu from "../components/layouts/DashboardMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "../types";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  // const navigate = useNavigate();

  // const [loggedInUser, setLoggedInUser] = useState<User>();
  // useEffect(() => {
  //   getLoggedInUser(JSON.parse(localStorage.getItem("user") as string)).then(
  //     (res) => {
  //       setLoggedInUser(res);
  //       if (res.role == "admin") {
  //         navigate("/admin");
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
            path: "/",
          },
          {
            name: "Books",
            path: "/books",
          },
          {
            name: "Wishlist",
            path: "/wishlist",
          },
          {
            name: "Activities",
            path: "/activities",
          },
          {
            name: "History",
            path: "/history",
          },
        ]}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
