import { useForm } from "react-hook-form";
import styles from "./AddReview.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, User } from "../../types";
import { addReview, getBook, getUser } from "../../utils";
import { Timestamp } from "@firebase/firestore";

const AddReview = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    rating: string;
    review: string;
  }>();

  const userId = JSON.parse(localStorage.getItem("user") as string)[0];
  const { bookId } = useParams();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(userId).then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Add Review</h1>
      <form
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          if (bookId && user) {
            addReview({
              ...data,
              bookId,
              user,
              "review date": Timestamp.fromDate(new Date()),
            }).then(() => {
              alert(`Your review has been submitted!`);
              navigate("/history");
            });
          }
        })}
      >
        <label htmlFor="rating">Rating</label>
        <div>
          <input {...register("rating")} type="radio" value="1" />
          <input {...register("rating")} type="radio" value="2" />
          <input {...register("rating")} type="radio" value="3" />
          <input {...register("rating")} type="radio" value="4" />
          <input {...register("rating")} type="radio" value="5" />
        </div>
        <br />
        <label htmlFor="review">Review</label>
        <textarea {...register("review", { required: true })} />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddReview;
