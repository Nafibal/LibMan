import { Link, useNavigate } from "react-router-dom";
import styles from "./DashboardMenu.module.scss";
import { useEffect, useState } from "react";
import { logout } from "../../utils";

type Props = {
  links: {
    name: string;
    path: string;
  }[];
};

const Dashboard = ({ links }: Props) => {
  const navigate = useNavigate();
  const [path, setPath] = useState(window.location.pathname);

  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <h2>LibMan</h2>
      </div>
      <div className={styles.links}>
        {links.map((link) => {
          return (
            <Link
              onClick={() => setPath(link.path)}
              key={link.name}
              className={`${styles.link} ${
                path == link.path ? styles.active : ""
              }`}
              to={link.path}
            >
              {link.name}
            </Link>
          );
        })}
        <button
          className={styles.button}
          onClick={() => {
            logout().then(() => {
              navigate("/login");
            });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
