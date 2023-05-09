import { SetStateAction, useEffect, useState } from "react";
import styles from "./BrowseBooks.module.scss";
import { Book } from "../../types";
import { getBooks, loanBook } from "../../utils";
import { Link } from "react-router-dom";
import { booksCollectionRef } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import BookCard from "../../components/user/BookCard";

const BrowseBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const userId = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    getBooks(searchTerm).then((res) => {
      const availableBooks: Book[] = res.filter(
        (book) => book.availability == true
      );

      setBooks(res);
    });
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.header_title}>
        <h1>Browse Books</h1>
        <input
          className={styles.search}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.card_container}>
        {books.map((book) => {
          return <BookCard book={book} />;
        })}
      </div>
    </div>
  );
};

export default BrowseBooks;
