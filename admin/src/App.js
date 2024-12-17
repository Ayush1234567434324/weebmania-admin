import React, { useState, useEffect } from 'react';
import './App.css';
import { gapi } from 'gapi-script';

function App() {
  const [images, setImages] = useState({
    cover: null,
    end: null,
    intro: null,
    common: null,
    pages: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState('');

  // Initialize Google API Client
  useEffect(() => {
    function initClient() {
      gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [process.env.REACT_APP_GOOGLE_DISCOVERY_DOCS],
        scope: process.env.REACT_APP_GOOGLE_SCOPE
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    gapi.load('client:auth2', initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    setIsAuthenticated(isSignedIn);
  };

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const createFolder = (folderName) => {
    return gapi.client.drive.files.create({
      resource: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      },
    });
  };

  const createSubFolder = (parentFolderId, subFolderName) => {
    return gapi.client.drive.files.create({
      resource: {
        name: subFolderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      },
    });
  };

  const handleUploadToDrive = (imageFile, parentFolderId, imageType) => {
    const fileContent = imageFile;
    let fileName = '';

    // Assign a specific name based on the image type
    switch (imageType) {
      case 'cover':
        fileName = 'cover.jpg';
        break;
      case 'end':
        fileName = 'end.jpg';
        break;
      case 'intro':
        fileName = 'intro.jpg';
        break;
      case 'common':
        fileName = 'common.jpg';
        break;
      case 'pages':
        fileName = `page-${Date.now()}.jpg`; // Unique name for each page
        break;
      default:
        fileName = imageFile.name; // Default to the file's original name if type is unknown
    }

    const metadata = {
      name: fileName,
      mimeType: 'image/jpeg',
      parents: [parentFolderId],
    };

    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', fileContent);

    setLoading(true); // Show loading spinner

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log('File uploaded successfully:', data);
        console.log('File uploaded successfully!');
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error uploading file:', error);
        console.log('Error uploading file');
      });
  };

  const handleImageChange = (event, imageType) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) => ({
      file,
      type: imageType,
    }));

    setImages((prevImages) => {
      const newImages = { ...prevImages };
      if (imageType === 'pages') {
        newImages[imageType] = [...newImages[imageType], ...imageArray];
      } else {
        newImages[imageType] = imageArray[0];
      }
      return newImages;
    });

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...imageArray,
    ]);
  };

  const handleUploadAll = () => {
    if (!folderName) {
      console.log('Please provide a folder name.');
      return;
    }

    setLoading(true);

    // Create the parent folder
    createFolder(folderName).then((folderResponse) => {
      const parentFolderId = folderResponse.result.id;

      // Create the "pages" sub-folder if there are pages to upload
      if (images.pages.length > 0) {
        createSubFolder(parentFolderId, 'pages').then((subFolderResponse) => {
          const subFolderId = subFolderResponse.result.id;
          // Upload each page image to the subfolder
          images.pages.forEach((fileObj) => {
            handleUploadToDrive(fileObj.file, subFolderId, 'pages'); // Pass 'pages' as imageType
          });
        });
      }

      // Upload other images (cover, end, intro, common) to the parent folder
      ['cover', 'end', 'intro', 'common'].forEach((imageType) => {
        if (images[imageType]) {
          handleUploadToDrive(images[imageType].file, parentFolderId, imageType); // Pass the respective imageType
        }
      });

      setSelectedFiles([]);
      setLoading(false);
    });
  };

  const renderImagePreviews = (imageCategory) => {
    const imagesList = images[imageCategory];

    if (Array.isArray(imagesList)) {
      return imagesList.map((image, index) => (
        <div key={index} className="image-preview">
          <img src={URL.createObjectURL(image.file)} alt={`${imageCategory} ${index}`} className="uploaded-image" />
        </div>
      ));
    }

    return (
      <div className="image-preview">
        <img src={URL.createObjectURL(imagesList.file)} alt={imageCategory} className="uploaded-image" />
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Upload Your Images</h1>

        {/* Sign-in/Sign-out Button */}
        <div className="auth-buttons">
          {!isAuthenticated ? (
            <button className="auth-button" onClick={handleSignIn}>Sign In with Google</button>
          ) : (
            <button className="auth-button" onClick={handleSignOut}>Sign Out</button>
          )}
        </div>

        {/* Folder Name Input */}
        <div className="folder-input">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="folder-name-input"
          />
        </div>

        {/* File Inputs for Image Uploads */}
        <div className="image-upload-section">
          <h2>Cover Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'cover')}
            className="image-upload-input"
          />
          {images.cover && renderImagePreviews('cover')}

          <h2>End Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'end')}
            className="image-upload-input"
          />
          {images.end && renderImagePreviews('end')}

          <h2>Introductory Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'intro')}
            className="image-upload-input"
          />
          {images.intro && renderImagePreviews('intro')}

          <h2>Common Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'common')}
            className="image-upload-input"
          />
          {images.common && renderImagePreviews('common')}

          <h2>Page Images (Collection)</h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e, 'pages')}
            className="image-upload-input"
          />
          {images.pages.length > 0 && renderImagePreviews('pages')}
        </div>

        {/* Upload All Button */}
        {selectedFiles.length > 0 && (
          <div className="upload-button-container">
            <button className="upload-button" onClick={handleUploadAll} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <div className="loading-spinner">Uploading...</div>}
      </div>
    </div>
  );
}

export default App;
