import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Modal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        {children}
        {/* <button onClick={onClose}>Close</button> */}
        <FontAwesomeIcon
          className={styles.icon}
          icon={faXmark}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
