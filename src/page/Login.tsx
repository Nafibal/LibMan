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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [pageStatus, setPageStatus] = useState<string>("signup");

  const onSubmit = (data: FormValues) => {
    if (pageStatus === "signup") {
      registerUser(data.username as string, data.email, data.password).then(
        () => {
          navigate("/");
        }
      );
    } else {
      login(data.email, data.password).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>{pageStatus === "signup" ? "SIGN UP" : "LOGIN"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {pageStatus === "signup" && (
            <div className={styles.input_container}>
              <label htmlFor="username">username</label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must not exceed 20 characters",
                  },
                })}
                type="text"
                name="username"
                id="username"
              />
              {errors.username && (
                <span className={styles.error}>{errors.username.message}</span>
              )}
            </div>
          )}
          <div className={styles.input_container}>
            <label htmlFor="email">email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              name="email"
              id="email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              name="password"
              id="password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <button type="submit">
            {pageStatus === "signup" ? "SIGN UP" : "LOGIN"}
          </button>
          <p className={styles.text}>
            {pageStatus === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setPageStatus(pageStatus === "signup" ? "login" : "signup");
              }}
            >
              {pageStatus === "signup" ? "login" : "sign up"}
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
