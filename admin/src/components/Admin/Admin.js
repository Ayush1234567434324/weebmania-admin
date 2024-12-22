// src/components/UploadSection/ImageUploadSection.js
import React from 'react';
import FolderNameInput from '../FolderInput/FolderNameInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import UploadButton from '../Auth/UploadButton';

const Admin = ({ folderName, setFolderName, images, handleImageChange, loading, handleUploadAll, isAuthenticated }) => {
  return (
    <div>
      <FolderNameInput folderName={folderName} setFolderName={setFolderName} />
      <ImageUpload handleImageChange={handleImageChange} images={images} />
      <UploadButton
        loading={loading}
        isAuthenticated={isAuthenticated}
        handleUploadAll={handleUploadAll}
      />
    </div>
  );
};

export default Admin;
