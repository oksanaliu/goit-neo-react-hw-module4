import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/lnr-magnifier.svg';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <div className={styles.SearchBarContainer}>
      <header className={styles.SearchBar}>
        <Toaster position="top-right" reverseOrder={false} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <img src={searchIcon} alt="Search" className={styles.searchIcon} />
          </button>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
          />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
