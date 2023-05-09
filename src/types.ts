import {
  DocumentData,
  DocumentReference,
  Timestamp,
} from "@firebase/firestore";

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  "reading list": DocumentReference<DocumentData>[];
  "borrowed books": DocumentReference<DocumentData>[];
  "fine amounts": number;
  wishlist: Book[];
};

export type Book = {
  id?: string;
  title: string;
  author: string;
  publisher: string;
  ISBN: string;
  description: string;
  genre: string;
  availability: boolean;
  "total copies": number;
  "borrowed copies": number;
  // "reserved copies": number;
};

export type Transaction = {
  id?: string;
  user: User;
  book: Book;
  status: "pending" | "active" | "completed" | "rejected";
  "transaction type": "return" | "borrow";
  "transaction date": Timestamp;
  "due date": Timestamp;
  "return date"?: Timestamp;
  "fine amount"?: number;
};

export type Review = {
  id?: string;
  user: User;
  bookId: string;
  rating: string;
  review: string;
  "review date": Timestamp;
};
