import {createFolder, handleUploadToDrive } from './googleDriveService';


export const uploadImagesToDrive = (images, folderName) => {
  if (!folderName) {
    
    return Promise.reject('Folder name is required');
  }
 


  return createFolder(folderName).then((folderResponse) => {
    const parentFolderId = folderResponse.result.id;
      
       const imageUploadPromises = ['cover', 'end', 'intro', 'common'].map((imageType) => {
        if (images[imageType]) {
          return handleUploadToDrive(images[imageType].file, parentFolderId, imageType);
        }
        return undefined; // Return undefined if the image does not exist
      }).filter(Boolean); // Filter out undefined values
      

 

    return Promise.all(imageUploadPromises);
  });
};
