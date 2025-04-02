import React, { useState, useRef, useEffect } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (city: string) => void;
  error: string;
  searchHistory: string[];
  onHistoryClick: (city: string) => void;
  onDeleteHistory: (city: string) => void;
  onClearHistory: () => void;
}

const Search: React.FC<SearchProps> = ({ 
  onSearch, 
  error, 
  searchHistory, 
  onHistoryClick, 
  onDeleteHistory, 
  onClearHistory 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowHistory(false);
    }
  };

  const handleHistoryItemClick = (city: string): void => {
    onHistoryClick(city);
    setSearchTerm(city);
    setShowHistory(false);
  };

  // Close history dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowHistory(true)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {showHistory && searchHistory.length > 0 && (
        <div className="search-history-dropdown">
          <div className="history-dropdown-header">
            <h4>Recent Searches</h4>
            <button 
              className="clear-history-btn" 
              onClick={() => {
                onClearHistory();
                setShowHistory(false);
              }}
            >
              Clear All
            </button>
          </div>
          
          <ul className="history-dropdown-list">
            {searchHistory.map((city, index) => (
              <li key={`${city}-${index}`} className="history-dropdown-item">
                <button 
                  className="history-city-btn" 
                  onClick={() => handleHistoryItemClick(city)}
                >
                  <i className="fas fa-history"></i> {city}
                </button>
                <button 
                  className="delete-history-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistory(city);
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;