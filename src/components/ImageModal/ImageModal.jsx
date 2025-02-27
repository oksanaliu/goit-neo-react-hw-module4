import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={styles.imageContainer}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'No description'}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.description}>
          {image.alt_description || 'No description'}
        </p>
        <p className={styles.author}>
          <strong>Author:</strong> {image.user?.name || 'Unknown'}
        </p>
        <p className={styles.likes}>
          <strong className={styles.heart}>
            <span className={styles.heart}>❤️</span> Likes:
          </strong>{' '}
          {image.likes}
        </p>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
