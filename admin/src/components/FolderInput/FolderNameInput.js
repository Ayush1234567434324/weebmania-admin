import React, { useState, useEffect } from 'react';
import { fetchExistingFolders } from '../../services/googleDriveService';
import './FolderNameInput.css';

const FolderNameInput = ({ folderName, setFolderName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (folderName) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(async () => {
        const fetchedFolders = await fetchExistingFolders(folderName);
        setSuggestions(fetchedFolders);
        setIsLoading(false);
      }, 300);

      return () => {
        clearTimeout(delayDebounceFn);
        setIsLoading(false);
      };
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [folderName]);

  const handleVerify = () => {
    if (selectedFolder) {
      setIsVerified(true);
      console.log(`Working with existing folder: ${selectedFolder}`);
    } else {
      alert('Please select an existing folder.');
    }
  };

  const renderVerifyButtonText = () => {
    if (suggestions.length === 1 || selectedFolder) {
      return '✔';
    } 
    if (isLoading) {
      return <div className="spinner-new"></div>;
    }
    return <div className="spinner-new"></div>;
  };

  return (
    <div className="input-group">
      <label className="input-label"><h2>Folder Name</h2></label>
      <input
        type="text"
        className="input-field"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Enter folder name"
      />
      {suggestions.length > 0 && (
        <ul className="dropdown-suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setFolderName(suggestion);
                setSelectedFolder(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {(suggestions.length > 0 || selectedFolder) && (
        <div className="verify-section">
          <button
            onClick={handleVerify}
            className={`verify-button ${isVerified ? 'verified' : ''}`}
          >
            {renderVerifyButtonText()}
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderNameInput;
