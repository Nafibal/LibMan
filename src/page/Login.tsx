import { useState } from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { login, registerUser } from "../utils";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const [pageStatus, setPageStatus] = useState<string>("signup");

  // console.log(auth.currentUser);

  if (pageStatus == "login") {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>LOGIN</h2>
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              login(data.email, data.password).then(() => {
                navigate("/");
              });
            })}
          >
            <div className={styles.input_container}>
              <label htmlFor="email">email</label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="password">password</label>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
              />
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
        <form
          action=""
          onSubmit={handleSubmit((data) => {
            registerUser(
              data.username as string,
              data.email,
              data.password
            ).then(() => {
              navigate("/");
            });
          })}
        >
          <div className={styles.input_container}>
            <label htmlFor="username">username</label>
            <input
              {...register("username")}
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="email">email</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">password</label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
            />
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
