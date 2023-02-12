export default function ImageGalleryItem({ key, imageSmall, imageLarge, tag }) {
  return (
    <li class="gallery-item" key={key} url = {imageLarge}>
      <img src={imageSmall} alt= {tag} />
    </li>
  );
}
