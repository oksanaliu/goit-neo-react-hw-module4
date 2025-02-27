import styles from './App.module.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './api/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalPages(1);
    setError(null);
    setHasSearched(true);
  };

  useEffect(() => {
    if (!searchQuery) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { results, total_pages } = await fetchImages(searchQuery, page);
        if (results.length === 0 && page === 1) {
          throw new Error('No results found for your search.');
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPages(total_pages);
      } catch (err) {
        setError(err.message || 'Something went wrong! Please try again.');
      }

      setIsLoading(false);
    };

    loadImages();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={styles.appContainer}>
      <div className={styles.searchContainer}>
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>
      <div className={styles.galleryContainer}>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <ImageGallery
            images={images}
            onImageClick={openModal}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && page < totalPages && (
          <div className={styles.loadMoreBtn}>
            <LoadMoreBtn onClick={handleLoadMore} />
          </div>
        )}
      </div>
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
