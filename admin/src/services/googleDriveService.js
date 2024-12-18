import { gapi } from "gapi-script";
export const createFolder = (folderName) => {
    return gapi.client.drive.files.create({
      resource: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      },
    });
  };
  
  export const createSubFolder = (parentFolderId, subFolderName) => {
    return gapi.client.drive.files.create({
      resource: {
        name: subFolderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      },
    });
  };
  
  export const handleUploadToDrive = (imageFile, parentFolderId, imageType) => {
    const fileContent = imageFile;
    let fileName = '';
  
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
        fileName = `page-${Date.now()}.jpg`;
        break;
      default:
        fileName = imageFile.name;
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
  
    return fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: formData,
    });
  };
  