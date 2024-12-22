import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadImagesToDrive } from '../../services/uploadService';

const useImageUploadHandler = (images, folderName) => {
  const [loading, setLoading] = useState(false);

  const handleUploadAll = () => {
    if (!folderName) {
      toast.error('Please provide a folder name.');
      return;
    }

    const requiredImages = ['cover', 'end', 'intro', 'common'];
    const missingImages = requiredImages.filter(imageType => !images[imageType]);

    if (missingImages.length > 0) {
      toast.error(`Please upload all the required images: ${missingImages.join(', ')}`);
      return;
    }

    setLoading(true);
    uploadImagesToDrive(images, folderName)
      .then(() => {
        setLoading(false);
        toast.success('Files uploaded successfully!');
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error uploading files. Please try again.');
        console.error('Error uploading files:', error);
      });
  };

  return {
    loading,
    handleUploadAll,
  };
};

export default useImageUploadHandler;
