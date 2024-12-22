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

  export const fetchExistingFolders = async (query) => {
    const drive = gapi.client.drive;
    try {
      const response = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name contains '${query}'`,
        fields: 'files(name)',
      });
      return response.result.files.map(file => file.name);
    } catch (error) {
      console.error('Error fetching folders:', error);
      return [];
    }
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
  
  export const checkFolderExists = (folderName) => {
    return new Promise((resolve, reject) => {
      const query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`;
  
      gapi.client.drive.files.list({
        q: query,
        fields: 'files(id, name)',
      }).then((response) => {
        // If folder exists, response.files will contain folder details
        const folderExists = response.result.files.length > 0;
        if (folderExists) {
          resolve(response.result.files[0].id); // Return the folder ID if it exists
        } else {
          resolve(null); // Return null if folder does not exist
        }
      }).catch((error) => {
        reject(error);
      });
    });
  };