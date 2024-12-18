import React from 'react';

const ImagePreview = ({ image, imageCategory }) => {
  return (
    <div className="image-preview">
      <img src={URL.createObjectURL(image.file)} alt={imageCategory} className="uploaded-image" />
    </div>
  );
};

export default ImagePreview;
