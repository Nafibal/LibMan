import { Link, useParams } from "react-router-dom";
import styles from "./BookPage.module.scss";
import { useEffect, useState } from "react";
import { Book, Review } from "../../types";
import {
  addBookToWishist,
  getBook,
  getBookReview,
  loanBook,
} from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/dashboard/Modal";
import { useForm } from "react-hook-form";
import { Timestamp } from "@firebase/firestore";
import ReviewCard from "../../components/user/ReviewCard";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  const [review, setReview] = useState<Review[]>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const userId = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    if (bookId) {
      getBook(bookId).then((res) => {
        setBook(res);
        // console.log(res);
      });
      getBookReview(bookId).then((res) => {
        setReview(res);
        // console.log(res);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form
          className={styles.return_form}
          onSubmit={handleSubmit((data) => {
            const dueDate = new Date(data["due date"]);

            loanBook(userId, book?.id as string, dueDate).then(() => {
              setIsModalOpen(false);
              alert("Your submission is submitted!");
            });
          })}
        >
          <p>
            How long will you borrow the book? <br /> Please enter the date
          </p>
          <input {...register("due date", { required: true })} type="date" />
          <button type="submit">Borrow Book</button>
        </form>
      </Modal>
      <div className={styles.book_container}>
        <Link to={"/books"}>
          <button className={styles.backBtn}>
            <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} />
          </button>
        </Link>
        <div className={styles.title_container}>
          <div className={styles.left}>
            <h1 className={styles.title}>{book?.title}</h1>
            <h4 className={styles.author}>by {book?.author}</h4>
            <button className={styles.genre}>{book?.genre}</button>
          </div>
          <div className={styles.right}>
            <button
              onClick={() => {
                if (book) {
                  addBookToWishist(userId, book).then(() => {
                    alert(
                      `${book.title} is successfully added to your wishlist`
                    );
                  });
                }
              }}
              className={styles.titleBtn}
            >
              Wishlist
            </button>
            <button
              className={styles.titleBtn}
              onClick={() => {
                if ((book?.["total copies"] as number) > 0) {
                  setIsModalOpen(true);
                  return;
                }
                alert(
                  `We're sorry, currently all copies of ${
                    book?.title as string
                  } has been borrowed`
                );
              }}
            >
              Borrow
            </button>
          </div>
        </div>
        <div className={styles.info_container}>
          <div className={styles.info_box}>
            <h3>Publisher</h3>
            <h4>{book?.publisher}</h4>
          </div>
          <div className={styles.info_box}>
            <h3>Available Copies</h3>
            <h4>{book?.["total copies"]}</h4>
          </div>
        </div>
        <div className={styles.description_container}>
          <p>{book?.description}</p>
        </div>
        <div className={styles.review_container}>
          {review?.map((item) => {
            return <ReviewCard key={item.id} review={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
