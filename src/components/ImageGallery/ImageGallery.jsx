import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem"

export default function ImageGallery({images}) {
    return(
        <ul>
             {images.map(image => {
                return(
                        <ImageGalleryItem
                        key={image.id}
                        id = {image.id} 
                        imageSmall = {image.webformatURL} 
                        imageLarge = {image.largeImageURL}
                        tag = {image.tag}
                        />        
            )})}
        </ul>
    )
}