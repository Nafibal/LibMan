import { useEffect, useState } from "react";
import styles from "./Wishlist.module.scss";
import { getUser, updateWishlist } from "../../utils";
import { Book } from "../../types";
import Tables from "../../components/dashboard/Tables";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const userId = JSON.parse(localStorage.getItem("user") as string)[0];

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState<Book[]>();

  useEffect(() => {
    getUser(userId).then((res) => {
      setWishlist(res.wishlist);
    });
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>Wishlist</h1>
      <Tables>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlist?.map((item) => {
            return (
              <tr
                key={item.id}
                onClick={() => {
                  navigate(`/book/${item.id}`);
                }}
                className={styles.tableRow}
              >
                <td>{item.ISBN}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.genre}</td>
                <td>
                  <button
                    onClick={() => {
                      const newWishlist = wishlist.filter(
                        (book) => book.id !== item.id
                      );
                      updateWishlist(userId, newWishlist).then(() => {
                        alert(
                          `${item.title} has been successfully removed from your wihslist`
                        );
                      });
                    }}
                  >
                    remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Tables>
    </div>
  );
};

export default Wishlist;
