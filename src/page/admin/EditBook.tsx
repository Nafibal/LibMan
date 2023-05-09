import styles from "./EditBook.module.scss";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Book } from "../../types";
import { getBook, updateBook } from "../../utils";

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<string>();
  const [book, setBook] = useState<Book>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Book>();

  useEffect(() => {
    if (bookId) {
      getBook(bookId)
        .then((res) => {
          setBook(res);
          setValue("ISBN", res.ISBN);
          setValue("title", res.title);
          setValue("author", res.author);
          setValue("publisher", res.publisher);
          setValue("genre", res.genre);
          setValue("description", res.description);
        })
        .catch(() => {
          console.log("error");
        });
    }

    // fetchBook();
  }, [bookId, setValue]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Book</h1>
      <form
        onSubmit={handleSubmit((data) => {
          updateBook(bookId as string, data).then(() => {
            alert(data.title + " has been successfully updated!");
            navigate("/admin/books");
          });
        })}
      >
        <div>
          <label>ISBN</label>
          <input {...register("ISBN", { required: true })} />
          {errors.ISBN && <span>This field is required</span>}
        </div>
        <div>
          <label>Title</label>
          <input {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <label>Author</label>
          <input {...register("author", { required: true })} />
          {errors.author && <span>This field is required</span>}
        </div>
        <div>
          <label>Publisher</label>
          <input {...register("publisher", { required: true })} />
          {errors.author && <span>This field is required</span>}
        </div>
        <div>
          <label>Genre</label>
          <input {...register("genre", { required: true })} />
          {errors.genre && <span>This field is required</span>}
        </div>
        <div>
          <label>Description</label>
          <br />
          <textarea {...register("description", { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditBook;
