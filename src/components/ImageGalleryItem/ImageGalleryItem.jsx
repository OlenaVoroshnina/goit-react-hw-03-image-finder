import { Item } from "./ImageGalleryItem.styled";
import { ImageItem } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ id, imageSmall, imageLarge, tag }) {
  return (
    <Item key={id} url = {imageLarge}>
      <ImageItem src={imageSmall} alt= {tag} />
    </Item>
  );
}
