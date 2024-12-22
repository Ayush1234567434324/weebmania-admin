import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGoogleAuth from './utils/hooks/useGoogleAuth';
import useImageUpload from './utils/hooks/useImageUpload';
import useImageUploadHandler from './utils/hooks/useImageUploadHandler';
import AuthButtons from './components/Auth/AuthButtons';
import Loader from './components/Loader/Loader';
import Admin from './components/Admin/Admin';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ErrorPage from './components/Auth/ErrorPage';
import Chapter from './components/ChapterUpload/Chapter';

const App = () => {
  const [folderName, setFolderName] = useState('');
  const { isAuthenticated, handleSignIn, handleSignOut } = useGoogleAuth();
  const { images, handleImageChange } = useImageUpload();
  const { loading, handleUploadAll } = useImageUploadHandler(images, folderName);
 
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
       <Routes>
          <Route 
            path="/" 
            element= {loading ? (
              <Loader /> // Show Loader only when uploading
            ) : (
              <>
                <h1 className="title">Admin Panel</h1>
                <AuthButtons
                  isAuthenticated={isAuthenticated}
                  handleSignIn={handleSignIn}
                  handleSignOut={handleSignOut}
                />
    
                {isAuthenticated && (
                 
                 <Admin
                    folderName={folderName}
                    setFolderName={setFolderName}
                    images={images}
                    handleImageChange={handleImageChange}
                    loading={loading}
                    handleUploadAll={handleUploadAll}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              </>
            )} 
          />
          <Route path="/chapter-upload" element={isAuthenticated?<Chapter/>:<ErrorPage/>} /> {/* New route page */}
        </Routes>

      </div>
    </div>
    </BrowserRouter>
  );
};

export default App;
