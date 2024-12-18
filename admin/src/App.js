import React, { useState } from 'react';
import './App.css';
import useGoogleAuth from './utils/hooks/useGoogleAuth';
import useImageUpload from './utils/hooks/useImageUpload';
import { uploadImagesToDrive } from './services/uploadService';
import AuthButtons from './components/Auth/AuthButtons';
import ImageUpload from './components/ImageUpload/ImageUpload';
import FolderNameInput from './components/FolderInput/FolderNameInput';
import UploadButton from './components/Auth/UploadButton';
import Loader from './components/Loader/Loader';

const App = () => {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, handleSignIn, handleSignOut } = useGoogleAuth();
  const { images, handleImageChange } = useImageUpload();

  const handleUploadAll = () => {
    if (!folderName) {
      console.log('Please provide a folder name.');
      return;
    }

    setLoading(true);

    uploadImagesToDrive(images, folderName)
      .then(() => {
        setLoading(false);
        console.log('Files uploaded successfully!');
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        {loading ? (
          <Loader /> // Show Loader only when uploading
        ) : (
          <>
            <h1 className="title">Admin Panel</h1>
            <AuthButtons
              isAuthenticated={isAuthenticated}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut}
            />
            <FolderNameInput folderName={folderName} setFolderName={setFolderName} />
            {isAuthenticated && (
              <ImageUpload handleImageChange={handleImageChange} images={images} />
            )}
            <UploadButton
              loading={loading}
              isAuthenticated={isAuthenticated}
              handleUploadAll={handleUploadAll}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
