import { FunctionComponent, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { collection, getDocs, doc } from "@firebase/firestore";
import {
  addBook,
  deleteBook,
  getBooks,
  getUser,
  getUsers,
  loanBook,
  updateBook,
} from "../utils";
import { Book, User } from "../types";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [books, setBooks] = useState<Book[]>([]);

  const navigate = useNavigate();

  // Dummy Book
  const newBook: Book = {
    title: "new book",
    author: "sherlock",
    publisher: "sapa",
    ISBN: "1234",
    description: "this is a description",
    genre: "fantasy",
    availability: true,
    "total copies": 5,
    "borrowed copies": 0,
    // "reserved copies": 0,
  };

  // userId
  const userId: string = JSON.parse(localStorage.getItem("user") as string)[0];

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
    getBooks().then((res) => {
      setBooks(res);
    });
    getUser(userId).then((res) => {
      setLoggedInUser(res);
    });
  }, []);

  return (
    <>
      <h1>Home</h1>
      {/* <h3>Users : {loggedInUser}</h3> */}
      {/* <h3>localStorage : {localStorage.getItem("userId")}</h3> */}

      {/* {console.log(localStorage.getItem("userId"))} */}

      {/* {console.log("User List : ", users)} */}
      {/* {console.log("Logged in User : ", loggedInUser)} */}
      <br />
      {books.map((book) => {
        // console.log(book);
        return (
          <div key={book.id}>
            <div>
              <h3>{book.title}</h3>
              <p>total copies : {book["total copies"]}</p>
              <p>borrowed copies : {book["borrowed copies"]}</p>
              {/* <p>reserved copies : {book["reserved copies"]}</p> */}
              <button
                onClick={() => {
                  updateBook(book.id as string, {
                    title: "new title for books",
                  });
                }}
              >
                Edit title
              </button>
              <button
                onClick={() => {
                  deleteBook(book.id as string);
                }}
              >
                Delete Book
              </button>
              <button
                onClick={() => {
                  loanBook(userId, book.id as string, new Date());
                }}
              >
                borrow book
              </button>
            </div>
            <br />
          </div>
        );
      })}
      <button
        onClick={() => {
          addBook(newBook);
        }}
      >
        add Book
      </button>
    </>
  );
};

export default Home;
