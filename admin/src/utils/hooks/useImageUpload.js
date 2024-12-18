import { useState } from 'react';

const useImageUpload = () => {
  const [images, setImages] = useState({
    cover: null,
    end: null,
    intro: null,
    common: null,
    pages: [],
  });

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
  };

  return { images, handleImageChange };
};

export default useImageUpload;
