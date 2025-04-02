import React from 'react';

const SearchHistory = ({ 
  history, 
  onHistoryClick, 
  onDeleteHistory, 
  onClearHistory 
}) => {
  if (history.length === 0) {
    return (
      <div className="search-history">
        <h3>Search History</h3>
        <p className="no-history">No search history yet</p>
      </div>
    );
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>Search History</h3>
        <button 
          className="clear-history-btn" 
          onClick={onClearHistory}
        >
          Clear All
        </button>
      </div>
      
      <ul className="history-list">
        {history.map((city, index) => (
          <li key={`${city}-${index}`} className="history-item">
            <button 
              className="history-city-btn" 
              onClick={() => onHistoryClick(city)}
            >
              {city}
            </button>
            <button 
              className="delete-history-btn" 
              onClick={() => onDeleteHistory(city)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory; 