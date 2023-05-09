import { Link } from "react-router-dom";
import styles from "./BookCard.module.scss";
import { Book } from "../../types";

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  return (
    <Link to={`/book/${book.id}`} key={book.id} className={styles.card}>
      <p className={styles.title}>{book.title}</p>
      <p className={styles.author}>by {book.author}</p>
      <p className={styles.genre}>{book.genre}</p>
    </Link>
  );
};

export default BookCard;
