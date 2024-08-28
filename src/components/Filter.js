import React, { useState } from 'react';
import './Filter.css';

function Filter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm || '');
    }
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default Filter;