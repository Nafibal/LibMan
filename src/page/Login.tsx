import { useState } from "react";
import styles from "./Login.module.scss";

const Login = () => {
  const [pageStatus, setPageStatus] = useState<string>("signup");

  if (pageStatus == "login") {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>LOGIN</h2>
          <form action="">
            <div className={styles.input_container}>
              <label htmlFor="email">email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="password">password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Login</button>
            <p className={styles.text}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setPageStatus("signup");
                }}
              >
                sign up
              </span>
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>SIGN UP</h2>
        <form action="">
          <div className={styles.input_container}>
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">SIGN UP</button>
          <p className={styles.text}>
            Already have an account?{" "}
            <span
              onClick={() => {
                setPageStatus("login");
              }}
            >
              login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
