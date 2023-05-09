import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "./page/user/Home";
import AdminDashboard from "./layouts/AdminDashboard";
import UserDashboard from "./layouts/UserDashboard";
import Login from "./page/Login";
import ManageBook from "./page/admin/ManageBook";
import ManageRequest from "./page/admin/ManageRequest";
import AdminHistory from "./page/admin/AdminHistory";
import AddBook from "./page/admin/AddBook";
import BrowseBooks from "./page/user/BrowseBooks";
import { auth } from "./firebase-config";
import { getUser } from "./utils";
import { User } from "./types";
import AdminHome from "./page/admin/AdminHome";
import Activities from "./page/user/Activities";
import History from "./page/user/History";
import AddReview from "./page/user/AddReview";
import BookPage from "./page/user/BookPage";
import Wishlist from "./page/user/Wishlist";
import EditBook from "./page/admin/EditBook";
import AdminActivities from "./page/admin/AdminActivities";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const user = JSON.parse(localStorage.getItem("user") as string);

      if (user !== null) {
        if (user[1] == "user") {
          return redirect("/");
        }
        return redirect("/admin");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <UserDashboard />,
    loader: () => {
      const user = JSON.parse(localStorage.getItem("user") as string);

      if (user == null) {
        return redirect("/login");
      }
      if (user[1] == "admin") {
        return redirect("/admin");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "books",
        element: <BrowseBooks />,
      },
      {
        path: "book/:bookId",
        element: <BookPage />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "addReview/:bookId",
        element: <AddReview />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    loader: () => {
      const user = JSON.parse(localStorage.getItem("user") as string);

      if (user == null) {
        return redirect("/login");
      }
      if (user[1] == "user") {
        return redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "books",
        children: [
          {
            path: "",
            element: <ManageBook />,
          },
          {
            path: "add",
            element: <AddBook />,
          },
          {
            path: "edit/:bookId",
            element: <EditBook />,
          },
        ],
      },
      {
        path: "request",
        element: <ManageRequest />,
      },
      {
        path: "activities",
        element: <AdminActivities />,
      },
      {
        path: "history",
        element: <AdminHistory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
