import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export default function ImageGallery({ images }) {
  return (
    <ImageGalleryStyle>
      {images.map(image => {
        const { id, webformatURL, largeImageURL, tag } = image;
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            imageSmall={webformatURL}
            imageLarge={largeImageURL}
            tag={tag}
          />
        );
      })}
    </ImageGalleryStyle>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
