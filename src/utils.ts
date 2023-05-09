import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "@firebase/firestore";
import {
  auth,
  booksCollectionRef,
  db,
  reviewCollectionRef,
  storage,
  transactionCollectionRef,
  usersCollectionRef,
} from "./firebase-config";
import { Book, User, Transaction, Review } from "./types";
import { ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// AUTHENTICATION
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    createUser(user.user.uid, username, email, password);
    localStorage.setItem("user", JSON.stringify([user.user.uid, "user"]));
  } catch (error: any) {
    console.log(error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUser(user.user.uid);
    localStorage.setItem(
      "user",
      JSON.stringify([user.user.uid, userData.role])
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};

export const createUser = async (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  const userDoc = doc(db, "users", id);
  setDoc(userDoc, {
    name,
    email,
    password,
    role: "user",
    "reading list": [],
    "borrowed books": [],
    "fine amounts": 0,
    wishlist: [],
  });
};

// USER
export const getUser = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  let userData: User = (await getDoc(userDocRef)).data() as User;
  userData = { ...userData, id: userId };
  return userData;
};

// BOOKS
export const getBooks = async (searchTerm?: string) => {
  const bookCollection = await getDocs(booksCollectionRef);

  if (searchTerm) {
    const q = query(
      booksCollectionRef,
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
      orderBy("title")
    );
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    const books: Book[] = [];
    querySnapshot.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    return books;
  }

  const books: Book[] = bookCollection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return books;
};

export const getBook = async (bookId: string) => {
  const bookDocRef = doc(db, "books", bookId);
  let bookData = (await getDoc(bookDocRef)).data() as Book;
  bookData = { ...bookData, id: bookId };
  return bookData;
};

export const addBook = async (data: Book) => {
  await addDoc(booksCollectionRef, data);
};

export const updateBook = async (id: string, data: object) => {
  const bookDoc = doc(db, "books", id);

  await updateDoc(bookDoc, data);
};

export const deleteBook = async (id: string) => {
  const bookDoc = doc(db, "books", id);
  await deleteDoc(bookDoc);
};

// Borrow Book
export const loanBook = async (
  userId: string,
  bookId: string,
  dueDate: Date
) => {
  try {
    // Get the book document and user document from Firestore
    const bookDocRef = doc(db, "books", bookId);
    const userDocRef = doc(db, "users", userId);

    const bookData = {
      ...(await getDoc(bookDocRef)).data(),
      id: bookId,
    } as Book;
    const userData = {
      ...(await getDoc(userDocRef)).data(),
      id: userId,
    } as User;

    if (bookData !== undefined && bookData["total copies"] !== 0) {
      await addDoc(transactionCollectionRef, {
        user: userData,
        book: bookData,
        status: "pending",
        "transaction type": "borrow",
        "transaction date": Timestamp.fromDate(new Date()),
        "due date": Timestamp.fromDate(dueDate),
      });
    }
  } catch (error) {}
};

// Return Book
export const returnBook = async (
  userId: string,
  bookId: string,
  transactionId: string
) => {
  const bookDocRef = doc(db, "books", bookId);
  const userDocRef = doc(db, "users", userId);
  const transactionDocRef = doc(db, "transactions", transactionId);

  const bookData = {
    ...(await getDoc(bookDocRef)).data(),
    id: bookId,
  } as Book;
  const userData = {
    ...(await getDoc(userDocRef)).data(),
    id: userId,
  } as User;
  const transactionData = (
    await getDoc(transactionDocRef)
  ).data() as Transaction;

  if (bookData !== undefined && bookData["borrowed copies"] !== 0) {
    const returnedDate = Timestamp.fromDate(new Date());

    await updateDoc(transactionDocRef, {
      user: userData,
      book: bookData,
      status: "pending",
      "transaction type": "return",
      "transaction date": returnedDate,
      "return date": returnedDate,
      "fine amount": calculateFine(
        transactionData["due date"],
        returnedDate,
        5
      ),
    });
  }
};

// REVIEWS
export const addReview = async (data: Review) => {
  await addDoc(reviewCollectionRef, data);
};

export const getBookReview = async (bookId: string) => {
  const q = query(reviewCollectionRef, where("bookId", "==", bookId));
  const querySnapshot = await getDocs(q);

  const reviews: Review[] = [];
  querySnapshot.forEach((doc) => {
    reviews.push({ ...doc.data(), id: doc.id });
  });

  return reviews;
};

// WISHLIST
export const addBookToWishist = async (userId: string, bookData: Book) => {
  const userDoc = doc(db, "users", userId);
  const userData = await getUser(userId);

  const wishlist = userData.wishlist;
  wishlist.push(bookData);

  updateDoc(userDoc, {
    wishlist: wishlist,
  });
};

export const updateWishlist = async (userId: string, newWishlist: Book[]) => {
  const userDoc = doc(db, "users", userId);

  await updateDoc(userDoc, {
    wishlist: [...newWishlist],
  });
};

// TRANSACTIONS
export const getTransactions = async (
  status?: "active" | "notActive" | "pending"
) => {
  const transactionCollection = await getDocs(transactionCollectionRef);

  const transactions: Transaction[] = transactionCollection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  if (status == "active") {
    const activeTransaction = transactions.filter(
      (trans) => trans.status == "active"
    );
    return activeTransaction;
  }
  if (status == "pending") {
    const pendingTransaction = transactions.filter(
      (trans) => trans.status == "pending"
    );
    return pendingTransaction;
  }
  if (status == "notActive") {
    const notActiveTransaction = transactions.filter(
      (trans) => trans.status == "completed" || trans.status == "rejected"
    );
    return notActiveTransaction;
  }

  return transactions;
};

export const getUserTransaction = async (
  userId: string,
  status?: "active" | "notActive" | "pending"
) => {
  const transactions = await getTransactions();
  const userTransaction = transactions.filter(
    (trans) => trans.user.id == userId
  );

  if (status == "active") {
    const activeTransaction = userTransaction.filter(
      (trans) => trans.status == "active"
    );
    return activeTransaction;
  }
  if (status == "pending") {
    const pendingTransaction = userTransaction.filter(
      (trans) => trans.status == "pending"
    );
    return pendingTransaction;
  }
  if (status == "notActive") {
    const notActiveTransaction = userTransaction.filter(
      (trans) => trans.status == "completed" || trans.status == "rejected"
    );
    return notActiveTransaction;
  }

  return userTransaction;
};
// Transaction Confirmation by admin
export const confirmTransaction = async (
  transactionId: string,
  type: "borrow" | "return",
  confirm: "confirm" | "reject",
  bookId: string
) => {
  const transactionDocRef = doc(db, "transactions", transactionId);
  const bookDocRef = doc(db, "books", bookId);

  const bookData = {
    ...(await getDoc(bookDocRef)).data(),
    id: bookId,
  } as Book;

  if (confirm == "confirm") {
    if (type == "borrow") {
      await updateDoc(transactionDocRef, { status: "active" });
      await updateDoc(bookDocRef, {
        "total copies": bookData["total copies"] - 1,
        "borrowed copies": bookData["borrowed copies"] + 1,
      });
      return;
    }
    if (type == "return") {
      await updateDoc(transactionDocRef, { status: "completed" });

      const transactionData = (await getDoc(transactionDocRef)).data();
      await updateDoc(bookDocRef, {
        "total copies": bookData["total copies"] + 1,
        "borrowed copies": bookData["borrowed copies"] - 1,
      });
      // const bookRef = transactionData?.book;
      // if (bookRef) {
      //   getDoc(bookRef).then((bookDoc) => {
      //     if (bookDoc.exists()) {
      //       const bookData = bookDoc.data() as Book;
      //       updateBook(bookData.id as string, {
      //         "borrowed copies": bookData["borrowed copies"] + 1,
      //       });
      //     }
      //   });
      // }
      return;
    }
  }
  await updateDoc(transactionDocRef, { status: "rejected" });
  return;
};

// UTILS FUNCTION
const calculateFine = (
  dueDate: Timestamp,
  returnedDate: Timestamp,
  finePerDay: number
) => {
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const dueDateTime = dueDate.toDate().getTime(); // Convert dueDate to Unix timestamp
  const returnedDateTime = returnedDate.toDate().getTime(); // Convert returnedDate to Unix timestamp
  const daysLate = Math.round((returnedDateTime - dueDateTime) / oneDay); // Calculate the number of days late
  const fineAmount = Math.max(daysLate * finePerDay, 0); // Calculate the fine amount (at least 0)
  return fineAmount;
};
