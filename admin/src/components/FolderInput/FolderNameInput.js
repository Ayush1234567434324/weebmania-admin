// components/FolderNameInput.js
import React from 'react';


const FolderNameInput = ({ folderName, setFolderName }) => (
  <div className="input-group">
    <label className="input-label"><h2>Folder Name</h2></label>
    <input
      type="text"
      className="input-field"
      value={folderName}
      onChange={(e) => setFolderName(e.target.value)}
      placeholder="Enter folder name"
    />
  </div>
);

export default FolderNameInput;
