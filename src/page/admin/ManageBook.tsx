import { SetStateAction, useEffect, useState } from "react";
import { Book } from "../../types";
import { deleteBook, getBooks } from "../../utils";

import styles from "./ManageBook.module.scss";
import { Link } from "react-router-dom";
import Tables from "../../components/dashboard/Tables";
// import Tables from "../../components/dashboard/Tables";

const ManageBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getBooks(searchTerm).then((res) => {
      setBooks(res);
    });
  }, [searchTerm]);
  // console.log(books);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Book List</h1>
        <input
          className={styles.search}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Link to={"/admin/books/add"} className={styles.addButton}>
          Add
        </Link>
      </div>
      <Tables>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Available Copies</th>
            <th>borrowed Copies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr>
                <td>{book.ISBN}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book["total copies"]}</td>
                <td>{book["borrowed copies"]}</td>
                <td>
                  <Link to={`edit/${book.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      deleteBook(book.id as string).then(() => {
                        alert(book.title + " has been deleted");
                        location.reload();
                      });
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
      {/* {books.length !== 0 && <Tables type="books" data={books} />} */}
    </div>
  );
};

export default ManageBook;
