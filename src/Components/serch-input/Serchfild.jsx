import React, { useState, useEffect } from 'react';
import useDebounce from '../../features/useDebounce';
import styles from './index.module.css'

const Searchfild = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 1200);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearInput = () => {
        setSearchTerm('');
        onSearch('');
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onSearch]);

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Start typing to search movie..."
                className={styles.search}
            />

            <button className={styles.clearButton} onClick={clearInput}>
                &#10005;
            </button>

        </div>
    );
};

export default Searchfild;