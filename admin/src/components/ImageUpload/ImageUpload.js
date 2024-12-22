import React from 'react';
import ImagePreview from './ImagePreview';
import './ImageUpload.css'
const ImageUpload = ({ handleImageChange, images }) => {
  return (
    <div className="image-upload-section">
      <h2>Cover Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'cover')}
        className="image-upload-input"
      />
      {images.cover && <ImagePreview image={images.cover} imageCategory="cover" />}

      <h2>End Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'end')}
        className="image-upload-input"
      />
      {images.end && <ImagePreview image={images.end} imageCategory="end" />}

      <h2>Introductory Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'intro')}
        className="image-upload-input"
      />
      {images.intro && <ImagePreview image={images.intro} imageCategory="intro" />}

      <h2>Common Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'common')}
        className="image-upload-input"
      />
      {images.common && <ImagePreview image={images.common} imageCategory="common" />}
    </div>
  );
};

export default ImageUpload;
