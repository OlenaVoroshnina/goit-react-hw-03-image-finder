import React, { Component } from 'react'
import { Item } from "./ImageGalleryItem.styled";
import { ImageItem } from "./ImageGalleryItem.styled";
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render(){
    const {showModal} = this.state;
    const {id, imageSmall, imageLarge, tag} = this.props
    return (
          <Item key={id} onClick = {this.toggleModal} >
            {showModal && <Modal onClick = {this.toggleModal}>{imageLarge}</Modal>}
            <ImageItem src={imageSmall} alt= {tag} />
          </Item>
        );
  }
}











// export default function ImageGalleryItem({ id, imageSmall, imageLarge, tag }) {
//   return (
//     <Item key={id} url = {imageLarge}>
//       <ImageItem src={imageSmall} alt= {tag} />
//     </Item>
//   );
// }
