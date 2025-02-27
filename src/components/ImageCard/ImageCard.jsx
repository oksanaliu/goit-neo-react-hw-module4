import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  console.log('Rendering ImageCard:', image);

  if (!image || !image.urls) {
    console.error('Invalid image data:', image);
    return null;
  }

  return (
    <div onClick={() => onClick(image)} className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'No description'}
      />
    </div>
  );
};

export default ImageCard;
