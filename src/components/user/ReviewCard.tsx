import styles from "./ReviewCard.module.scss";
import { Review } from "../../types";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  const maxRating = 5;
  const rating = parseInt(review.rating);
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.reviewCard}>
      <p className={styles.username}>{review.user.name}</p>
      <div className={styles.star_container}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon icon={faStar} color="gold" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon icon={faStar} color="grey" />
        ))}
      </div>
      <p className={styles.review}>{review.review}</p>
    </div>
  );
};

export default ReviewCard;
