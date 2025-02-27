import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick, isLoading, hasSearched }) => {
  if (!isLoading && hasSearched && images.length === 0) {
    return <p className={styles.noImages}>No images found for your search.</p>;
  }

  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li key={image.id || index} className={styles.galleryItem}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
