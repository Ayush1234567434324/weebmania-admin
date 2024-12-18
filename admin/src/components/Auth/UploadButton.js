import React from 'react';

const UploadButton = ({ loading, isAuthenticated, handleUploadAll }) => {
  return (
    <button
      className="upload-button"
      onClick={handleUploadAll}
      disabled={loading || !isAuthenticated}
    >
      {loading ? 'Uploading...' : 'Upload All Images'}
    </button>
  );
};

export default UploadButton;
