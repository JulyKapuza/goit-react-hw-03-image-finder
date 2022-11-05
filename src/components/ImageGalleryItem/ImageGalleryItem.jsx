import React from 'react';
import PropTypes from 'prop-types';
import css from './Image.GalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick, largeImg }) => (
  <li className={css.ImageGalleryItem} onClick={() => onClick(largeImg)}>
    <img className={css.ImageGalleryItemImage} src={webformatURL} alt={tags} />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};
