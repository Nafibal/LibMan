import { useNavigate } from "react-router-dom";
import styles from "./AddBook.module.scss";
import { useForm } from "react-hook-form";
import { Book } from "../../types";
import { addBook } from "../../utils";

const AddBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  return (
    <div className={styles.container}>
      <h1>Add Book</h1>
      <div className={styles.form_container}>
        <form
          onSubmit={handleSubmit((data) => {
            addBook({ ...data, availability: true, "borrowed copies": 0 }).then(
              () => {
                alert(data.title + " has been successfully added!");
                navigate("/admin/books");
              }
            );
          })}
        >
          <input
            type="text"
            placeholder="title"
            {...register("title", { required: true })}
          />
          <input
            type="text"
            placeholder="author"
            {...register("author", { required: true })}
          />
          <input
            type="text"
            placeholder="publisher"
            {...register("publisher", { required: true })}
          />
          <input
            type="text"
            placeholder="ISBN"
            {...register("ISBN", { required: true })}
          />
          <textarea {...register("description", { required: true })} />
          <select {...register("genre", { required: true })}>
            <option value="nonFiction">nonFiction</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Thriller">Thriller</option>
            <option value="Mystery">Mystery</option>
            <option value="Horror">Horror</option>
            <option value="Action">Action</option>
            <option value="History">History</option>
          </select>
          <input
            type="number"
            placeholder="total copies"
            {...register("total copies", { required: true })}
          />

          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
