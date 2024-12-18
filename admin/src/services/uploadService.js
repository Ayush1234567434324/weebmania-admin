import { createFolder, createSubFolder, handleUploadToDrive } from './googleDriveService';

export const uploadImagesToDrive = (images, folderName) => {
  if (!folderName) {
    return Promise.reject('Folder name is required');
  }

  return createFolder(folderName).then((folderResponse) => {
    const parentFolderId = folderResponse.result.id;
       // Upload other images (cover, end, intro, common)
       const imageUploadPromises = ['cover', 'end', 'intro', 'common'].map((imageType) => {
        if (images[imageType]) {
          alert('no');
          return handleUploadToDrive(images[imageType].file, parentFolderId, imageType);
        }
      });

    // Upload pages first if any
    if (images.pages.length > 0) {
      return createSubFolder(parentFolderId, 'pages').then((subFolderResponse) => {
        const subFolderId = subFolderResponse.result.id;
        const pageUploadPromises = images.pages.map((fileObj) =>
          handleUploadToDrive(fileObj.file, subFolderId, 'pages')
        );
        return Promise.all(pageUploadPromises);
      });
    }

 

    return Promise.all(imageUploadPromises);
  });
};
